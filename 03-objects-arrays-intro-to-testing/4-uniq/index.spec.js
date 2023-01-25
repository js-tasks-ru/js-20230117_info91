import { uniq } from './index.js';

describe('objects-arrays-intro-to-testing/uniq', () => {
  it('should return array with uniq values', () => {
    expect(uniq([1, 1])).toEqual([1]);
    expect(uniq([1, 'a', 'a', 2, 2])).toEqual([1, 'a', 2]);
  });

  it('should return empty array if was passed array without values', () => {
    expect(uniq([])).toEqual([]);
  });

  it('should return empty array if arguments wasn\'t passed', () => {
    expect(uniq()).toEqual([]);
  });
});
