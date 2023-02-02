export default class SortableTable {
  _element = null;

  constructor(headerConfig = [], data = []) {
    this._headerConfig = headerConfig;
    this._allowSorting = new Map(
      headerConfig
        .filter((v) => {
          return v.sortable;
        })
        .map((v) => {
          return [v.id, v.sortType];
        })
    );
    this._data = data;
    this._render();
  }

  _render() {
    const wrap = document.createElement("div");
    wrap.innerHTML = this._getTemplate();
    this._element = wrap.firstElementChild;
    if (!this._body)
      this._body = this._element.querySelector(".sortable-table__body");
  }

  _getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this._getHeaderTemplate()}
          ${this._getBodyTemplate()}
        </div>
      </div>
    `;
  }

  // id: 'title',
  // title: 'Name',
  // sortable: true,
  // sortType: 'string'

  _getHeaderTemplate() {
    return this.isConfigNotEmpty()
      ? `<div
        data-element="header"
        class="sortable-table__header sortable-table__row"
      >
        ${this._headerConfig
          .map((item) => this._getHeaderCellTemplate(item))
          .join("")}
      </div>`
      : "";
  }
  _getHeaderCellTemplate(cell) {
    return `<div
    class="sortable-table__cell"
    data-id="${cell.id}"
    data-sortable="${cell.sortable}"
    data-order="asc"
  >
    <span>${cell.title}</span>

  </div>`; //${this._getSortArrowTemplate(cell.id)}
  }

  _getBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
      ${this._getBodyInnerTemplate()}
    </div>`;
  }
  _getBodyInnerTemplate() {
    return this.isDataLoaded()
      ? this._data.map((item) => this._getBodyRowTemplate(item)).join("")
      : this._getPlaceholderTemplate();
  }
  _getBodyRowTemplate(row = {}) {
    if (this.isConfigNotEmpty() && row) {
      return `<a href="/products/${row.id}" class="sortable-table__row">
     ${this._headerConfig
       .map(({ id }) => {
         return this._getBodyCellTemplate(id, row[id]);
       })
       .join("")}
    </a>`;
    }
    return "";
  }
  _getBodyCellTemplate(type = "", cell = "") {
    if (type === "images")
      return `  <div class="sortable-table__cell">
        <img
          class="sortable-table-image"
          alt="${cell[0].source ?? ""}"
          src=""
        />
      </div>`; /*${cell[0].url ?? ""}*/
    return `<div class="sortable-table__cell">${cell ?? ""}</div>`;
  }
  _getLoadingTemplate() {
    return `    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>`;
  }
  _getPlaceholderTemplate() {
    return ` <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
    <div>
      <p>No products satisfies your filter criteria</p>
      <button type="button" class="button-primary-outline">Reset all filters</button>
    </div>
    </div>`;
  }
  _getSortArrowTemplate() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`;
  }

  sort(fieldValue, orderValue) {
    if (this._allowSorting.has(fieldValue)) {
      switch (this._allowSorting.get(fieldValue)) {
        case "string":
          this._sortStrings(fieldValue, orderValue);
          break;
        default:
          this._data.sort((a, b) => {
            return orderValue === "asc"
              ? a[fieldValue] - b[fieldValue]
              : b[fieldValue] - a[fieldValue];
          });
      }
      this.updateData();
    }
  }
  _sortStrings(fieldName, param = "asc") {
    return this._data.sort(function (a, b) {
      return param === "asc"
        ? a[fieldName].localeCompare(b[fieldName].toUpperCase(), ["ru", "en"])
        : b[fieldName].localeCompare(a[fieldName].toUpperCase(), ["ru", "en"]);
    });
  }

  updateData(newData = this._data) {
    if (newData !== this._data) {
      this._data = newData;
      this._render();
    }
    if (this.isDataLoaded()) {
      this._body.innerHTML = this._getBodyInnerTemplate();
    }
  }

  remove() {
    if (this.element) this.element.remove();
  }

  destroy() {
    this.remove();
    this._element = null;
  }

  get element() {
    return this._element;
  }
  isConfigNotEmpty() {
    return this._headerConfig && this._headerConfig.length > 0;
  }
  isDataLoaded() {
    return this._data;
  }
}
