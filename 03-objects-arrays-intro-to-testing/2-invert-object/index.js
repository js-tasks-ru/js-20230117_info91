/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns the new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (obj) {
    return Object.entries(obj).reduce((accum, [key, value]) => {
      accum[value] = key;
      return accum;
    }, {});
  }
}
