import { sum } from './index.js';

describe('intro/sum', () => {
  it('should return sum of numbers', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
