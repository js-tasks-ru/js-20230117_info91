/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  return typeof size !== "undefined"
    ? string.split("").reduce(
        (prev, char) => {
          if (prev.curChar !== char && size > 0) {
            prev.counter = 1;
            prev.curChar = char;
            prev.str += char;
          } else if (prev.counter < size) {
            prev.counter++;
            prev.str += char;
          }
          return prev;
        },
        { str: "", counter: 0, curChar: "" }
      ).str
    : string;
}
