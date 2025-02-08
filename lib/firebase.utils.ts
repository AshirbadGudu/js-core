import {
  FirebaseSnapshot,
  FirebaseNestedSnapshot,
  FirebaseFlatSnapshot,
} from './types/firebase';

// Convert Firebase snapshot to array
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

// Get single array from a nested snapshot
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
