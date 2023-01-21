/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const result = {};

  for (const item of fields) {
    if (item in obj) {
      result[item] = obj[item];
    }
  }
  return result;
};
