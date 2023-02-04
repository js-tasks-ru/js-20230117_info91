import SortableTable from './index.js';

const data = [
  {
    'id': 'soska-(pustyshka)-nuk-10729357',
    'title': 'Соска (пустышка) NUK 10729357',
    'price': 3,
    'sales': 14
  },
  {
    'id': 'tv-tyuner-d-color--dc1301hd',
    'title': 'ТВ тюнер D-COLOR  DC1301HD',
    'price': 15,
    'sales': 13
  },
  {
    'id': 'detskiy-velosiped-lexus-trike-racer-trike',
    'title': 'Детский велосипед Lexus Trike Racer Trike',
    'price': 53,
    'sales': 11
  },
  {
    'id': 'soska-(pustyshka)-philips-scf182/12',
    'title': 'Соска (пустышка) Philips SCF182/12',
    'price': 9,
    'sales': 11
  },
  {
    'id': 'powerbank-akkumulyator-hiper-sp20000',
    'title': 'Powerbank аккумулятор Hiper SP20000',
    'price': 30,
    'sales': 11
  },
];

export const headerConfig = [
  {
    id: 'title',
    title: 'Name',
    sortable: true,
    sortType: 'string'
  },
  {
    id: 'price',
    title: 'Price',
    sortable: true,
    sortType: 'number'
  },
  {
    id: 'sales',
    title: 'Sales',
    sortable: true,
    sortType: 'number'
  },
];

describe('events-practice/sortable-table-v2', () => {
  let sortableTable;

  beforeEach(() => {
    sortableTable = new SortableTable(headerConfig, {
      data,
      sorted: {
        id: headerConfig.find(item => item.sortable).id,
        order: 'asc'
      }
    });

    document.body.append(sortableTable.element);
  });

  afterEach(() => {
    sortableTable.destroy();
    sortableTable = null;
  });

  it('should be rendered correctly', () => {
    expect(sortableTable.element).toBeVisible();
    expect(sortableTable.element).toBeInTheDocument();
  });

  it('should have default sorting marked by arrow icon', () => {
    const arrow = sortableTable.element.querySelector('.sortable-table__sort-arrow');
    const parent = arrow.parentNode;

    expect(arrow).toBeInTheDocument();
    expect(parent).toHaveAttribute('data-id', expect.stringContaining('title'));
  });

  it('should sort "desc" correctly for "sortType" equal string', () => {
    const { children } = sortableTable.subElements.header;
    const [title] = children;

    const pointerdown = new MouseEvent('pointerdown', {
      bubbles: true
    });

    title.dispatchEvent(pointerdown);

    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow).toHaveTextContent('Powerbank аккумулятор Hiper SP20000');
    expect(lastRow).toHaveTextContent('Детский велосипед Lexus Trike Racer Trike');
  });

  it('should sort "desc" correctly for "sortType" equal number', () => {
    const { children } = sortableTable.subElements.header;
    const [_, price] = children;

    const pointerdown = new MouseEvent('pointerdown', {
      bubbles: true
    });

    price.dispatchEvent(pointerdown);

    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow).toHaveTextContent('53');
    expect(lastRow).toHaveTextContent('3');
  });

  it('should move arrow icon to the corresponding column after sorting', () => {
    const { children } = sortableTable.subElements.header;
    const [_, price, sales] = children;

    const pointerdown = new MouseEvent('pointerdown', {
      bubbles: true
    });

    price.dispatchEvent(pointerdown);

    expect(price).toContainHTML(`<span data-element="arrow" class="sortable-table__sort-arrow"`);

    sales.dispatchEvent(pointerdown);

    expect(sales).toContainHTML(`<span data-element="arrow" class="sortable-table__sort-arrow"`);
  });

  it('should have ability to be destroyed', () => {
    sortableTable.destroy();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
