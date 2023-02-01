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

export const header = [
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

describe('dom-document-loading/sortable-table-v1', () => {
  let sortableTable;

  beforeEach(() => {
    sortableTable = new SortableTable(header, data);

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

  it('should not have default sorting', () => {
    const columns = sortableTable.element.querySelectorAll('.sortable-table__cell[data-id]');
    const isSortingExists = [...columns].some(column => column.dataset.order);

    expect(isSortingExists).toBeFalsy();
  });

  it('should sort "asc" correctly for "sortType" equal string', () => {
    const field = 'title';

    sortableTable.sort(field, 'asc');

    const cellIndex = header.findIndex(obj => obj.id === field);
    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow.children[cellIndex].textContent).toEqual('Детский велосипед Lexus Trike Racer Trike');
    expect(lastRow.children[cellIndex].textContent).toEqual('Powerbank аккумулятор Hiper SP20000');
  });

  it('should sort "desc" correctly for "sortType" equal string', () => {
    const field = 'title';

    sortableTable.sort(field, 'desc');

    const cellIndex = header.findIndex(obj => obj.id === field);
    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow.children[cellIndex].textContent).toEqual('Powerbank аккумулятор Hiper SP20000');
    expect(lastRow.children[cellIndex].textContent).toEqual('Детский велосипед Lexus Trike Racer Trike');
  });

  it('should sort "asc" correctly for "sortType" equal number', () => {
    const field = 'price';

    sortableTable.sort(field, 'asc');

    const cellIndex = header.findIndex(obj => obj.id === field);
    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow.children[cellIndex].textContent).toEqual('3');
    expect(lastRow.children[cellIndex].textContent).toEqual('53');
  });

  it('should sort "desc" correctly for "sortType" equal number', () => {
    const field = 'price';

    sortableTable.sort(field, 'desc');

    const cellIndex = header.findIndex(obj => obj.id === field);
    const { body } = sortableTable.subElements;
    const firstRow = body.firstElementChild;
    const lastRow = body.lastElementChild;

    expect(firstRow.children[cellIndex].textContent).toEqual('53');
    expect(lastRow.children[cellIndex].textContent).toEqual('3');
  });

  it('should have ability to be destroyed', () => {
    sortableTable.destroy();

    expect(sortableTable.element).not.toBeInTheDocument();
  });
});
