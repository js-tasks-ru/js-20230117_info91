import { createGetter } from './index.js';

describe('objects-arrays-intro-to-testing/create-getter', () => {
  it('should return existed properties', () => {
    const obj = {
      category: {
        title: 'Goods',
        foo: undefined
      }
    };
    const getter = createGetter('category.title');

    expect(getter(obj)).toEqual('Goods');
  });

  it('should return "undefined" for properties which does not exist', () => {
    const obj = {
      category: {
        title: 'Goods',
        foo: undefined
      }
    };
    const getter1 = createGetter('category.foo');
    const getter2 = createGetter('category.bar');

    expect(getter1(obj)).toBeUndefined();
    expect(getter2(obj)).toBeUndefined();
  });

  it('gets obj.property', () => {
    const getter = createGetter('property');

    expect(getter({property: 1})).toEqual(1);
  });

  it('returns undefined for no property', () => {
    const getter = createGetter('property');

    expect(getter({})).toBeUndefined();
  });

  it('gets obj.nested.property', () => {
    const getter = createGetter('nested.property');

    expect(getter({nested: {property: 1}})).toEqual(1);
  });

  it('returns undefined for no nested.property', () => {
    const getter = createGetter('nested.property');

    expect(getter({})).toBeUndefined();
  });

  it('gets more.nested.property', () => {
    const getter = createGetter('more.nested.property');

    expect(getter({more: {nested: {property: 1}}})).toEqual(1);
  });
});
