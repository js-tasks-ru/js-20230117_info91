/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(field) {
  return (obj) => {
    return field.split(".").reduce((current, item) => {
      return current && Object.hasOwn(current, item)
        ? current[item]
        : undefined;
    }, obj);
  };
}
