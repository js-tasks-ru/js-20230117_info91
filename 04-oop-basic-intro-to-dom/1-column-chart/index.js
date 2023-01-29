export default class ColumnChart {
  _chartHeight = 50;
  _element = null;

  constructor(
    { data = null, label = "", value = 0, link = "", formatHeading = null } = {
      data: null,
      label: "",
      value: 0,
      link: "",
      formatHeading: null,
    }
  ) {
    this._updateData(data);
    this._label = label;
    this._value = value;
    this._link = link;
    this._formatHeading = formatHeading;

    this._render();
  }

  _render() {
    let columnChartClasses = this._isDataLoaded()
      ? "column-chart"
      : "column-chart column-chart_loading";

    this._element = document.createElement("div");
    this._element.className = columnChartClasses;
    this._element.style = `--chart-height: ${this._chartHeight}`;

    this._element.innerHTML = `
      ${this._makeTitleHTML()}
      <div class="column-chart__container">
        ${this._makeHeaderHTML()}
        ${this._makeChartsHTML()}
      </div>
    `;
  }

  _makeTitleHTML() {
    const linkHtml = this._link
      ? `<a href="${this._link}" class="column-chart__link">View all</a>`
      : "";
    return `<div class="column-chart__title">Total ${this._label}${linkHtml}</div>`;
  }

  // formatHeading: (data) => `$${data}`, смущает преобразование,
  // оно не получает '$243,437', как в примере, будет просто '$243437'
  _makeHeaderHTML() {
    return `<div data-element="header" class="column-chart__header">${
      this._formatHeading
        ? this._formatHeading(this._value ?? "")
        : this._value ?? ""
    }</div>`;
  }

  _makeChartHTML() {
    return this._isDataLoaded()
      ? this._data
          .map(
            (item) =>
              `<div style="--value: ${item.value}" data-tooltip="${item.percent}"></div>`
          )
          .join("")
      : "";
  }
  _makeChartsHTML() {
    return `<div data-element="body" class="column-chart__chart">${this._makeChartHTML()}</div>`;
  }

  _getColumnProps(data = this._data) {
    const maxValue = Math.max(...data);
    const scale = 50 / maxValue;

    return data.map((item) => {
      return {
        percent: ((item / maxValue) * 100).toFixed(0) + "%",
        value: String(Math.floor(item * scale)),
      };
    });
  }

  get chartHeight() {
    return this._chartHeight;
  }

  get element() {
    return this._element;
  }

  _isDataLoaded(data = this._data) {
    return data && data.length > 0;
  }

  _updateData(newData) {
    this._data = this._isDataLoaded(newData) && this._getColumnProps(newData);
  }

  update(newData) {
    this._updateData(newData);

    this._element.querySelector(".column-chart__chart").innerHTML =
      this._makeChartHTML();
  }

  remove() {
    this._element = null;
  }

  destroy() {
    this.remove();
  }
}
