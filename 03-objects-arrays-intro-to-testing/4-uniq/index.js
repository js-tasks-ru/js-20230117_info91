/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  if (typeof arr === "undefined" || arr.length === 0) return [];

  // Object.keys(
  return arr.reduce(
    (itt, char) =>
      typeof itt.obj[char] === "undefined" &&
      (itt.obj[char] = 1) &&
      itt.arr.push(char)
        ? itt
        : itt,
    { obj: {}, arr: [] }
  ).arr;
}
