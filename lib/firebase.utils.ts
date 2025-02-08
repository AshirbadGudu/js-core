import {
  FirebaseSnapshot,
  FirebaseNestedSnapshot,
  FirebaseFlatSnapshot,
} from './types/firebase';

/**
 * Converts a Firebase snapshot to an array with customizable ID field.
 *
 * @template T - Type of the snapshot data
 * @param {FirebaseSnapshot<FirebaseFlatSnapshot<T>>} snap - The Firebase snapshot to convert
 * @param {string} [key='id'] - The key name to use for document IDs in the resulting array
 * @param {Array<T & { [K: string]: string }>} [arr=[]] - Optional accumulator array
 * @returns {Array<T & { [K: string]: string }>} An array containing the snapshot data with document IDs
 *
 * @example
 * // Basic usage with default key
 * const snapshot = {
 *   val: () => ({
 *     'user123': { name: 'John', email: 'john@example.com' },
 *     'user456': { name: 'Jane', email: 'jane@example.com' }
 *   }),
 *   exists: () => true
 * };
 * const result = getArrFromSnap(snapshot);
 * // Result: [
 * //   { id: 'user123', name: 'John', email: 'john@example.com' },
 * //   { id: 'user456', name: 'Jane', email: 'jane@example.com' }
 * // ]
 */
const getArrFromSnap = <T>(
  snap: FirebaseSnapshot<FirebaseFlatSnapshot<T>>,
  key = 'id',
  arr: Array<T & { [K: string]: string }> = []
): Array<T & { [K: string]: string }> => {
  const snapVal = snap.val();
  if (snap.exists() && snapVal)
    for (const id in snapVal) {
      const item = snapVal[id];
      if (item) arr.push({ ...item, [key]: id });
    }
  return arr;
};

/**
 * Flattens a nested Firebase snapshot into a single array with customizable primary and secondary keys.
 * Useful for handling nested collections in Firebase.
 *
 * @template T - Type of the nested snapshot data
 * @param {FirebaseSnapshot<FirebaseNestedSnapshot<T>>} snap - The nested Firebase snapshot to convert
 * @param {string} [primary_key='id'] - The key name for the inner document IDs
 * @param {string} [secondary_key='_id'] - The key name for the outer document IDs
 * @param {Array<T & { [K: string]: string }>} [arr=[]] - Optional accumulator array
 * @returns {Array<T & { [K: string]: string }>} A flattened array containing the nested data
 *
 * @example
 * // Basic usage with default keys
 * const snapshot = {
 *   val: () => ({
 *     'store1': {
 *       'order1': { product: 'A', quantity: 1 },
 *       'order2': { product: 'B', quantity: 2 }
 *     },
 *     'store2': {
 *       'order3': { product: 'C', quantity: 3 }
 *     }
 *   }),
 *   exists: () => true
 * };
 * const result = getArrFromNestedSnap(snapshot);
 * // Result: [
 * //   { id: 'order1', _id: 'store1', product: 'A', quantity: 1 },
 * //   { id: 'order2', _id: 'store1', product: 'B', quantity: 2 },
 * //   { id: 'order3', _id: 'store2', product: 'C', quantity: 3 }
 * // ]
 *
 * @example
 * // Using custom key names
 * const result = getArrFromNestedSnap(snapshot, 'orderId', 'storeId');
 * // Result: [
 * //   { orderId: 'order1', storeId: 'store1', product: 'A', quantity: 1 },
 * //   { orderId: 'order2', storeId: 'store1', product: 'B', quantity: 2 },
 * //   { orderId: 'order3', storeId: 'store2', product: 'C', quantity: 3 }
 * // ]
 */
const getArrFromNestedSnap = <T>(
  snap: FirebaseSnapshot<FirebaseNestedSnapshot<T>>,
  primary_key = 'id',
  secondary_key = '_id',
  arr: Array<T & { [K: string]: string }> = []
): Array<T & { [K: string]: string }> => {
  const snapVal = snap.val();
  if (snap.exists() && snapVal)
    for (const _id in snapVal) {
      const nestedObj = snapVal[_id];
      if (nestedObj) {
        for (const id in nestedObj) {
          arr.push({
            ...nestedObj[id],
            [primary_key]: id,
            [secondary_key]: _id,
          });
        }
      }
    }
  return arr;
};

export { getArrFromSnap, getArrFromNestedSnap };
