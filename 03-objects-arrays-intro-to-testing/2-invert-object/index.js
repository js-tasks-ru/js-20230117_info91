/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  return obj
    ? Object.fromEntries(Object.entries(obj).map(([key, val]) => [val, key]))
    : obj;
}
