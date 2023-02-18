import RangePicker from "./components/range-picker/src/index.js";
import SortableTable from "../../07-async-code-fetch-api-part-1/2-sortable-table-v3/index.js";
import ColumnChart from "../../07-async-code-fetch-api-part-1/1-column-chart/index.js";
import header from "./bestsellers-header.js";

import fetchJson from "./utils/fetch-json.js";

const BACKEND_URL = "https://course-js.javascript.ru/";

export default class Page {
  element = {};
  subElements = {};
  rangePicker = {};
  sortableTable = {};

  charts = [
    {
      url: "api/dashboard/orders",
      range: { from: this.from, to: this.to },
      label: "orders",
      name: "ordersChart",
    },
    {
      url: "api/dashboard/sales",
      range: { from: this.from, to: this.to },
      label: "sales",
      formatHeading: (data) => `$${data}`,
      name: "salesChart",
    },
    {
      url: "api/dashboard/customers",
      range: { from: this.from, to: this.to },
      label: "customers",
      name: "customersChart",
    },
  ];
  columnCharts = [];

  constructor() {
    const date = new Date();
    this.to = new Date(date);
    this.from = new Date(date.setMonth(date.getMonth() - 1));
  }
  async render() {
    const wrap = document.createElement("div");
    wrap.innerHTML = this.getTemplate();
    this.element = wrap.firstElementChild;
    this.getSubElements();
    this.initComponents();

    return this.element;
  }
  initComponents() {
    this.rangePicker = new RangePicker({ from: this.from, to: this.to });
    this.subElements["rangePicker"].append(this.rangePicker.element);
    // this.sortableTable = new SortableTable(header, {
    //   url: "api/rest/products",
    // });
    // this.subElements["rangePicker"].append(this.sortableTable.element);
    this.charts.forEach((item) => {
      const chart = new ColumnChart(item);
      this.columnCharts.push(chart);
      this.subElements[item.name].append(chart.element);
    });
  }
  getSubElements() {
    for (const item of this.element.querySelectorAll("[data-element]")) {
      this.subElements[item.dataset.element] = item;
    }
  }
  getTemplate() {
    return `<div class="dashboard">
    <div class="content__top-panel">
      <h2 class="page-title">Dashboard</h2>
      <!-- RangePicker component -->
      <div data-element="rangePicker"></div>
    </div>
    <div data-element="chartsRoot" class="dashboard__charts">
      <!-- column-chart components -->
      <div data-element="ordersChart" class="dashboard__chart_orders"></div>
      <div data-element="salesChart" class="dashboard__chart_sales"></div>
      <div data-element="customersChart" class="dashboard__chart_customers"></div>
    </div>
    <h3 class="block-title">Best sellers</h3>
    <div data-element="sortableTable">
      <!-- sortable-table component -->
    </div>`;
  }
  remove() {
    if (this.element) {
      this.element.remove();
    }
  }
  destroy() {
    this.remove();
    this.element = null;
    this.subElements = null;
    this.rangePicker = null;
    this.sortableTable = null;
    this.charts = null;
    this.columnCharts = null;
  }
}
