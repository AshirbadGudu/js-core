// Convert an object to array
const getArrFromObj = (object, arr = []) => {
  for (const id in object) arr.push({ id, ...object[id] });
  return arr;
};
// Convert Firebase snapshot to array
const getArrFromSnap = (snap, key = "id", arr = []) => {
  const snapVal = snap.val();
  if (snap.exists())
    for (const id in snapVal) arr.push({ ...snapVal[id], [key]: id });
  return arr;
};
// Format Currency
const formatCurrency = (amount, currency_code = "en-IN") =>
  new Intl.NumberFormat(currency_code, {
    style: "currency",
    currency: "INR",
  }).format(amount);

module.exports = { getArrFromObj, getArrFromSnap, formatCurrency };
