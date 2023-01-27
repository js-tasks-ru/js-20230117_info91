import ColumnChart from './index.js';

describe('oop-basic-intro-to-dom/column-chart', () => {
  let columnChart;

  beforeEach(() => {
    columnChart = new ColumnChart({
      data: [],
      label: '',
      link: '',
      value: 0
    });

    document.body.append(columnChart.element);
  });

  afterEach(() => {
    columnChart.destroy();
    columnChart = null;
  });

  it('should be rendered correctly', () => {
    expect(columnChart.element).toBeInTheDocument();
    expect(columnChart.element).toBeVisible();
  });

  it('should have ability to define "label"', () => {
    const label = 'New label';

    columnChart = new ColumnChart({ label });

    const title = columnChart.element.querySelector('.column-chart__title');

    expect(title).toHaveTextContent(label);
  });

  it('should have ability to define "link"', () => {
    const link = 'https://google.com';

    columnChart = new ColumnChart({ link });

    document.body.append(columnChart.element);

    const columnLink = columnChart.element.querySelector('.column-chart__link');

    expect(columnLink).toBeVisible();
  });

  it('should have property "chartHeight"', () => {
    columnChart = new ColumnChart();

    expect(columnChart.chartHeight).toEqual(50);
  });

  it('should have ability to define total value', () => {
    const value = 200;
    columnChart = new ColumnChart({ value });
    const columnLink = columnChart.element.querySelector('.column-chart__header');

    expect(columnLink).toHaveTextContent(value);
  });

  it('should have ability to define "formatHeading" function', () => {
    const formatHeading = data => `USD ${data}`;
    const value = 100;

    columnChart = new ColumnChart({ formatHeading, value });
    const columnLink = columnChart.element.querySelector('.column-chart__header');

    expect(columnLink).toHaveTextContent(formatHeading(value));
  });

  it('should render data correctly', () => {
    const data = [10, 20, 30];

    columnChart = new ColumnChart({ data });

    const chart = columnChart.element.querySelector('.column-chart__chart');
    const columnProps = getColumnProps(data);

    expect(chart.childElementCount).toEqual(data.length);

    expect(getComputedStyle(chart.children[0]).getPropertyValue('--value')).toEqual(columnProps[0].value);
    expect(getComputedStyle(chart.children[1]).getPropertyValue('--value')).toEqual(columnProps[1].value);
    expect(getComputedStyle(chart.children[2]).getPropertyValue('--value')).toEqual(columnProps[2].value);

    expect(chart.children[0].dataset.tooltip).toEqual(columnProps[0].percent);
    expect(chart.children[1].dataset.tooltip).toEqual(columnProps[1].percent);
    expect(chart.children[2].dataset.tooltip).toEqual(columnProps[2].percent);
  });

  it('should have ability to be updated by new "data" values (should re-render only body with charts columns)', () => {
    const data = [10];

    columnChart = new ColumnChart({ data });

    const chart = columnChart.element.querySelector('.column-chart__chart');

    const newData = [20];
    const columnProps = getColumnProps(newData);

    columnChart.update(newData);

    expect(getComputedStyle(chart.children[0]).getPropertyValue('--value')).toEqual(columnProps[0].value);
    expect(chart.children[0].dataset.tooltip).toEqual(columnProps[0].percent);
  });

  it('should have loading indication if data wasn\'t passed ', () => {
    columnChart = new ColumnChart();
    document.body.append(columnChart);

    expect(columnChart.element).toHaveClass('column-chart_loading');
  });

  it('should have ability to be removed', () => {
    columnChart.remove();

    expect(columnChart.element).not.toBeInTheDocument();
  });
});

function getColumnProps(data) {
  const maxValue = Math.max(...data);
  const scale = 50 / maxValue;

  return data.map(item => {
    return {
      percent: (item / maxValue * 100).toFixed(0) + '%',
      value: String(Math.floor(item * scale))
    };
  });
}
