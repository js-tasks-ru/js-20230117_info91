/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  return typeof size != "undefined"
    ? string.split("").reduce(
        (s, char) => {
          if (s.curChar !== char && size > 0) {
            s.counter = 1;
            s.curChar = char;
            s.str += char;
          } else if (s.counter < size) {
            s.counter++;
            s.str += char;
          }
          return s;
        },
        { str: "", counter: 0, curChar: "" }
      ).str
    : string;
}
