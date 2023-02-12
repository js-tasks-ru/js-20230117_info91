import escapeHtml from "./utils/escape-html.js";
import fetchJson from "./utils/fetch-json.js";

const IMGUR_CLIENT_ID = "28aaa2e823b03b1";
const BACKEND_URL = "https://course-js.javascript.ru";

export default class ProductForm {
  element = null;
  controller = new AbortController();
  product = null;
  categories = null;
  subElements = {};
  CAT_API_URL = "api/rest/categories";
  PRODUCT_API_URL = "api/rest/products";
  constructor(productId) {
    this.productId = productId;
  }

  async render() {
    const wrap = document.createElement("div");

    await this.loadData();

    wrap.innerHTML = this.getTemplate();
    this.element = wrap.firstElementChild;
    this.getSubElements();

    return this.element;
  }

  getSubElements() {
    for (const item of this.element.querySelectorAll("[data-element]")) {
      this.subElements[item.dataset.element] = item;
    }
  }

  async loadData() {
    const promises = [];
    promises.push(this.loadCategories());
    if (this.productId) {
      promises.push(this.loadProduct());
    }

    try {
      const data = await Promise.all(promises);
      if (data[0] && data[0].length > 0) {
        this.categories = data[0];
      }
      if (data[1] && data[1][0]) {
        this.product = data[1][0];
      }
      // console.dir(this.categories);
      // console.dir(this.product);
    } catch (e) {
      console.error("Error of data loading. " + e);
    }
  }

  loadCategories() {
    const query = new URL(this.CAT_API_URL, BACKEND_URL);
    query.searchParams.set("_sort", "weight");
    query.searchParams.set("_refs", "subcategory");

    return fetchJson(query);
  }
  loadProduct() {
    if (this.productId) {
      const query = new URL(this.PRODUCT_API_URL, BACKEND_URL);
      query.searchParams.set("id", this.productId);

      return fetchJson(query);
    }
  }

  //  TEMPLATES
  getTemplate() {
    return `<div class="product-form">
        <form data-element="productForm" class="form-grid">
        ${this.getTitleTemplate()}
        ${this.getDescriptionTemplate()}
        ${this.getPhotosTemplate()}
        ${this.getCategoriesTemplate()}
        ${this.getPropertiesTemplate()}
        ${this.getButtonsTemplate()}
        </form>
      </div>`;
  }
  getTitleTemplate() {
    return `<div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input
            value="${this.product ? escapeHtml(this.product.title) : ""}"
            required=""
            type="text"
            name="title"
            id="title"
            class="form-control"
            placeholder="Название товара"
          />
        </fieldset>
      </div>
    `;
  }
  getDescriptionTemplate() {
    return `<div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea
          required=""
          class="form-control"
          name="description"
          id="description"
          data-element="productDescription"
          placeholder="Описание товара"
        >${this.product ? escapeHtml(this.product.description) : ""}</textarea>
      </div>`;
  }
  getPhotosTemplate() {
    return `<div
        class="form-group form-group__wide"
        data-element="sortable-list-container"
      >
        <label class="form-label">Фото</label>
        <div data-element="imageListContainer">
          <ul class="sortable-list">
            ${
              this.product
                ? this.product.images
                    .map((photo) => {
                      return this.getPhotoTemplate(photo);
                    })
                    .join("")
                : ""
            }
          </ul>
        </div>
        <button type="button" name="uploadImage" class="button-primary-outline">
          <span>Загрузить</span>
        </button>
      </div>`;
  }
  getPhotoTemplate(photo) {
    return `<li class="products-edit__imagelist-item sortable-list__item" style="">
        <input
          type="hidden"
          name="url"
          value="${photo.url || ""}"
        />
        <input
          type="hidden"
          name="source"
          value="${photo.source || ""}"
        />
        <span>
          <img src="icon-grab.svg" data-grab-handle="" alt="grab" />
          <img
            class="sortable-table__cell-img"
            alt="Image"
            src="${photo.url || ""}"
          />
          <span>${photo.source || ""}</span>
        </span>
        <button type="button">
          <img src="icon-trash.svg" data-delete-handle="" alt="delete" />
        </button>
      </li>`;
  }
  getCategoriesTemplate() {
    return `<div class="form-group form-group__half_left">
      <label class="form-label">Категория</label>
      <select class="form-control" name="subcategory" id="subcategory">
        ${this.categories
          .map((cat) => {
            return this.getCategoryTemplate(cat);
          })
          .join("")}
      </select>
    </div>`;
  }
  getCategoryTemplate(cat) {
    return cat.subcategories
      .map((item) => {
        return this.getSubcategoryTemplate(cat.title, item);
      })
      .join("");
  }
  getSubcategoryTemplate(parentName, item) {
    return `<option value="${item.id}">${parentName} > ${item.title}</option>`;
  }
  getPropertiesTemplate() {
    return `<div class="form-group form-group__half_left form-group__two-col">
          <fieldset>
            <label class="form-label">Цена ($)</label>
            <input
              value="${this.product ? this.product.price || "" : ""}"
              required=""
              type="number"
              name="price"
              id="price"
              class="form-control"
              placeholder="100"
            />
          </fieldset>
          <fieldset>
            <label class="form-label">Скидка ($)</label>
            <input
              value="${this.product ? this.product.discount || "" : ""}"
              required=""
              type="number"
              name="discount"
              id="discount"
              class="form-control"
              placeholder="0"
            />
          </fieldset>
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Количество</label>
          <input
            value="${this.product ? this.product.quantity || "" : ""}"
            required=""
            type="number"
            class="form-control"
            name="quantity"
            id="quantity"
            placeholder="1"
          />
        </div>
        <div class="form-group form-group__part-half">
          <label class="form-label">Статус</label>
          <select class="form-control" name="status" id="status" >
            <option value="1" value="${
              this.product && this.product.status === 1 ? "selected" : ""
            }">Активен</option>
            <option value="0" ${
              this.product && this.product.status === 0 ? "selected" : ""
            }>Неактивен</option>
          </select>
        </div>`;
  }
  getButtonsTemplate() {
    return `<div class="form-buttons">
    <button type="submit" name="save" class="button-primary-outline">
      Сохранить товар
    </button>
  </div>`;
  }
  //  /TEMPLATES

  remove() {
    // eslint-disable-next-line curly
    if (this.element) this.element.remove();
  }
  destroy() {
    this.remove();
    this.element = null;
    this.controller.abort();
  }
}
