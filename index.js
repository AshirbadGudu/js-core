const getArrFromObj = (object, arr = []) => {
  for (const id in object) arr.push({ id, ...object[id] });
  return arr;
};

module.exports = { getArrFromObj };
