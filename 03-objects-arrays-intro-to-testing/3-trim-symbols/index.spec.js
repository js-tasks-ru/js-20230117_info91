import { trimSymbols } from './index.js';

describe('objects-arrays-intro-to-testing/trim-symbols', () => {
  it('should remove an identical consecutive characters that exceed the specified size', () => {
    expect(trimSymbols('xxxaaxx', 1)).toEqual('xax');
    expect(trimSymbols('xxxaaaaab', 1)).toEqual('xab');
    expect(trimSymbols('eedaaad', 2)).toEqual('eedaad');
    expect(trimSymbols('xxxaxxx', 2)).toEqual('xxaxx');
  });

  it('should return empty string if it was passed to function like an argument', () => {
    expect(trimSymbols('', 2)).toEqual('');
  });

  it('should return empty string if "size" equal 0', () => {
    expect(trimSymbols('accbbdd', 0)).toEqual('');
  });

  it('should return the same string if "size" parameter wasn\'t specified', () => {
    expect(trimSymbols('aaa')).toEqual('aaa');
  });
});
