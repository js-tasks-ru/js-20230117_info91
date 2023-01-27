/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(field) {
  const splitFields = field.split(".");

  return (obj) => {
    return splitFields.reduce((current, item) => {
      return current && Object.hasOwn(current, item)
        ? current[item]
        : typeof current === "undefined"
        ? current
        : current[item];
    }, obj);
  };
}
