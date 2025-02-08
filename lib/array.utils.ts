/**
 * Converts an object to an array with customizable ID field.
 *
 * @template T - Type of the object values
 * @param {Record<string, T>} object - The source object to convert
 * @param {string} [key='id'] - The key name to use for the object's keys in the resulting array
 * @param {Array<T & { [K: string]: string }>} [arr=[]] - Optional accumulator array
 * @returns {Array<T & { [K: string]: string }>} An array containing the object's values with their keys
 *
 * @example
 * // Basic usage with default key
 * const obj = {
 *   '1': { name: 'John', age: 30 },
 *   '2': { name: 'Jane', age: 25 }
 * };
 * const result = getArrFromObj(obj);
 * // Result: [
 * //   { id: '1', name: 'John', age: 30 },
 * //   { id: '2', name: 'Jane', age: 25 }
 * // ]
 *
 * @example
 * // Using custom key name
 * const result = getArrFromObj(obj, 'uid');
 * // Result: [
 * //   { uid: '1', name: 'John', age: 30 },
 * //   { uid: '2', name: 'Jane', age: 25 }
 * // ]
 */
const getArrFromObj = <T extends Record<string, unknown>>(
  object: Record<string, T>,
  key = 'id',
  arr: Array<T & { [K: string]: string }> = []
): Array<T & { [K: string]: string }> => {
  for (const id in object) arr.push({ [key]: id, ...object[id] });
  return arr;
};

export { getArrFromObj };
