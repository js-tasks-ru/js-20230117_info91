export default class SortableTable {
  element = null;
  subElements = [];
  isSortLocally = true;

  constructor(headerConfig = [], { data = [], sorted = {} }) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.sorted = sorted;
    this.render();
  }

  render() {
    this.sortOnClient(true);

    const wrap = document.createElement("div");
    wrap.innerHTML = this.getTemplate();
    this.element = wrap.firstElementChild;

    for (const item of this.element.querySelectorAll("div[data-element]")) {
      this.subElements[item.dataset.element] = item;
    }

    this.addSortEvent();
  }

  addSortEvent() {
    this.subElements.header.addEventListener("pointerdown", (event) => {
      const target = event.target.closest("div");
      if (
        this.headerConfig.filter((item) => item.id === target.dataset.id)[0]
          .sortable
      ) {
        this.sorted = {
          id: target.dataset.id,
          order: this.sorted.order === "asc" ? "desc" : "asc",
        };
        this.sort();
      }
    });
  }

  sort() {
    if (this.isSortLocally) {
      this.sortOnClient();
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(noUpdate = false) {
    let sortFns;
    const sortOrder = this.sorted.order;
    const sortId = this.sorted.id;

    switch (
      this.headerConfig.filter((item) => item.id === sortId)[0].sortType
    ) {
      case "string":
        sortFns = (a, b) => {
          return sortOrder === "asc"
            ? a[sortId]
                .toUpperCase()
                .localeCompare(b[sortId].toUpperCase(), ["ru", "en"])
            : b[sortId]
                .toUpperCase()
                .localeCompare(a[sortId].toUpperCase(), ["ru", "en"]);
        };
        break;
      case "number":
        sortFns = (a, b) => {
          return sortOrder === "asc"
            ? a[sortId] - b[sortId]
            : b[sortId] - a[sortId];
        };
    }
    this.data.sort(sortFns);
    if (!noUpdate) this.updateData();
  }

  getTemplate() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          ${this.getHeaderTemplate()}
          ${this.getBodyTemplate()}
        </div>
      </div>
    `;
  }

  getHeaderTemplate() {
    return this.isConfigNotEmpty()
      ? `<div
        data-element="header"
        class="sortable-table__header sortable-table__row"
      >
        ${this.getHeaderInnerTemplate()}
      </div>`
      : "";
  }

  getHeaderInnerTemplate() {
    return this.isConfigNotEmpty()
      ? this.headerConfig
          .map((item) => this.getHeaderCellTemplate(item))
          .join("")
      : "";
  }

  getHeaderCellTemplate(cell) {
    return `<div
    class="sortable-table__cell"
    data-id="${cell.id}"
    data-sortable="${cell.sortable}"
    data-order="${
      this.sorted && this.sorted.id === cell.id ? this.sorted.order : ""
    }"
  >
    <span>${cell.title}</span>
    ${this.getSortArrowTemplate(cell.id)}
  </div>`;
  }

  getBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">
      ${this.getBodyInnerTemplate()}
    </div>`;
  }
  getBodyInnerTemplate() {
    return this.isDataLoaded()
      ? this.data.map((item) => this.getBodyRowTemplate(item)).join("")
      : this.getPlaceholderTemplate();
  }

  getBodyRowTemplate(row = {}) {
    if (this.isConfigNotEmpty() && row) {
      return `<a href="/products/${row.id}" class="sortable-table__row">

     ${this.headerConfig
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

  getLoadingTemplate() {
    return `    <div data-element="loading" class="loading-line sortable-table__loading-line"></div>`;
  }

  getPlaceholderTemplate() {
    return ` <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
    <div>
      <p>No products satisfies your filter criteria</p>
      <button type="button" class="button-primary-outline">Reset all filters</button>
    </div>
    </div>`;
  }

  getSortArrowTemplate(id) {
    return id === this.sorted.id
      ? `<span data-element="arrow" class="sortable-table__sort-arrow"><span class="sort-arrow"></span></span>`
      : "";
  }

  updateData(newData = this.data) {
    if (newData !== this.data) {
      this.data = newData;
      this.render();
    }
    if (this.isDataLoaded()) {
      this.subElements.body.innerHTML = this.getBodyInnerTemplate();
      this.subElements.header.innerHTML = this.getHeaderInnerTemplate();
    }
  }

  remove() {
    if (this.element) this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }

  isConfigNotEmpty() {
    return this.headerConfig && this.headerConfig.length > 0;
  }
  isDataLoaded() {
    return this.data;
  }
}
