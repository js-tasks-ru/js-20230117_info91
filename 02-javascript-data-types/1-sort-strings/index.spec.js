import { sortStrings } from './index.js';

describe('javascript-data-types/sort-strings', () => {
  it('should return sorted by "asc" array of strings', () => {
    expect(sortStrings(['b', 'c', 'a'])).toEqual(['a', 'b', 'c']);
  });

  it('should return a new sorted array', () => {
    const arr = ['b', 'c', 'a'];
    const arrCopy = [...arr];
    const sorted = sortStrings(arr);

    expect(arr === sorted).toBeFalsy();
    expect(arr).toEqual(arrCopy);
  });

  it('should return sorted by "desc" array of strings in "en" locale', () => {
    expect(sortStrings(['b', 'c', 'a'], 'desc')).toEqual(['c', 'b', 'a']);
  });

  it('should correctly sort language-specific characters in "ru" locale', () => {
    expect(sortStrings(['абрикос', 'яблоко', 'ёжик'])).toEqual(['абрикос', 'ёжик', 'яблоко']);
  });

  it('should correctly sort strings started from uppercase', () => {
    expect(sortStrings(['абрикос', 'Абрикос', 'яблоко', 'Яблоко', 'ёжик', 'Ёжик']))
      .toEqual(['Абрикос', 'абрикос', 'Ёжик', 'ёжик', 'Яблоко', 'яблоко']);

    expect(sortStrings(['apple', 'Apple', 'banana', 'Banana', 'orange', 'Orange']))
      .toEqual(['Apple', 'apple', 'Banana', 'banana', 'Orange', 'orange']);
  });

  it('should correctly sort strings for mixed "en" and "ru" locales', () => {
    const data = [
      'Соска (пустышка) NUK 10729357',
      'ТВ тюнер D-COLOR  DC1301HD',
      'Детский велосипед Lexus Trike Racer Trike',
      'Соска (пустышка) Philips SCF182/12',
      'Powerbank аккумулятор Hiper SP20000'
    ];

    const expectedAsc = [
      'Детский велосипед Lexus Trike Racer Trike',
      'Соска (пустышка) NUK 10729357',
      'Соска (пустышка) Philips SCF182/12',
      'ТВ тюнер D-COLOR  DC1301HD',
      'Powerbank аккумулятор Hiper SP20000'
    ];

    const expectedDesc = [
      'Powerbank аккумулятор Hiper SP20000',
      'ТВ тюнер D-COLOR  DC1301HD',
      'Соска (пустышка) Philips SCF182/12',
      'Соска (пустышка) NUK 10729357',
      'Детский велосипед Lexus Trike Racer Trike'
    ];

    expect(sortStrings(data, 'asc')).toEqual(expectedAsc);
    expect(sortStrings(data, 'desc')).toEqual(expectedDesc);
  });
});
