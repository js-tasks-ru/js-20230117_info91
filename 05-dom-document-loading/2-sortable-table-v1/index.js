export default class SortableTable {
  _element = null;
  _subElements = [];

  constructor(headerConfig = [], data = []) {
    this._headerConfig = headerConfig;
    this._currentSort = { fieldValue: "", orderValue: "" };

    this._allowSorting = this._getAllowSortingFields(headerConfig);
    this._data = data;

    this._render();
  }

  _render() {
    const wrap = document.createElement("div");
    wrap.innerHTML = this._getTemplate();
    this._element = wrap.firstElementChild;
    this.getSubElements();
  }

  getSubElements() {
    for (const item of this.element.querySelectorAll("div[data-element]")) {
      this._subElements[item.dataset.element] = item;
    }
  }

  _getAllowSortingFields(cfg) {
    return Object.fromEntries(
      cfg
        .filter((v) => {
          return v.sortable;
        })
        .map((v) => {
          return [v.id, v.sortType];
        })
    );
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

  _getHeaderTemplate() {
    return this.isConfigNotEmpty()
      ? `<div
        data-element="header"
        class="sortable-table__header sortable-table__row"
      >
        ${this._getHeaderInnerTemplate()}
      </div>`
      : "";
  }

  _getHeaderInnerTemplate() {
    return this.isConfigNotEmpty()
      ? this._headerConfig
          .map((item) => this._getHeaderCellTemplate(item))
          .join("")
      : "";
  }

  _getHeaderCellTemplate(cell) {
    return `<div
    class="sortable-table__cell"
    data-id="${cell.id}"
    data-sortable="${cell.sortable}"
    data-order="${this._currentSort.orderValue}"
  >
    <span>${cell.title}</span>
    ${this._getSortArrowTemplate(cell.id)}
  </div>`;
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
       .map((headerColumn) => {
         return headerColumn.template
           ? headerColumn.template(row[headerColumn.id])
           : `<div class="sortable-table__cell">${
               row[headerColumn.id] || ""
             }</div>`;
       })
       .join("")}
    </a>`;
    }
    return "";
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

  _getSortArrowTemplate(id) {
    return id === this._currentSort.fieldValue
      ? `<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`
      : "";
  }

  sort(fieldValue, orderValue) {
    if (
      this._currentSort.fieldValue !== fieldValue ||
      this._currentSort.orderValue !== orderValue
    ) {
      this._currentSort = { fieldValue: fieldValue, orderValue: orderValue };
      if (this._allowSorting[fieldValue]) {
        switch (this._allowSorting[fieldValue]) {
          case "string":
            this._sortStrings(fieldValue, orderValue);
            break;
          case "number":
            this._data.sort((a, b) => {
              return orderValue === "asc"
                ? a[fieldValue] - b[fieldValue]
                : b[fieldValue] - a[fieldValue];
            });
            break;
          default:
            throw new Error("Parameter orderValue error.");
        }
        this.updateData();
      }
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
      this.subElements.body.innerHTML = this._getBodyInnerTemplate();
      this.subElements.header.innerHTML = this._getHeaderInnerTemplate();
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
  get subElements() {
    return this._subElements;
  }
  isConfigNotEmpty() {
    return this._headerConfig && this._headerConfig.length > 0;
  }
  isDataLoaded() {
    return this._data;
  }
}
