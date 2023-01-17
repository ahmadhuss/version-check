/**
 * This function will check if the following value is an array
 * and it has values based on that return boolean
 * @param array {*} - Type would be any
 * @returns {boolean} - Returns the boolean
 */
export const checkElements = function (array) {
  return !!(Array.isArray(array) && array.length > 0);
};
