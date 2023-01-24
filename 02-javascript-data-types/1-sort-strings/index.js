/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} [arr=[]] arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr = [], param = 'asc') {
  const directions = {
    asc: 1,
    desc: -1
  };
  const direction = directions[param];

  return makeSorting(arr, direction);
}

function makeSorting(array, direction) {
  return [...array].sort((string1, string2) =>
    direction * string1.localeCompare(string2, ['ru', 'en'], {caseFirst: 'upper'}));
}
