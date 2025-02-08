// Convert an object to array
const getArrFromObj = <T extends Record<string, unknown>>(
  object: Record<string, T>,
  key = 'id',
  arr: Array<T & { [K: string]: string }> = []
): Array<T & { [K: string]: string }> => {
  for (const id in object) arr.push({ [key]: id, ...object[id] });
  return arr;
};

export { getArrFromObj };
