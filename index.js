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
// Get single array from a nested snapshot
const getArrFromNestedSnap = (
  snap,
  primary_key = "id",
  secondary_key = "_id",
  arr = []
) => {
  const snapVal = snap.val();
  if (snap.exists())
    for (const _id in snapVal) {
      for (const id in snapVal[_id]) {
        arr.push({
          ...snapVal[_id][id],
          [primary_key]: id,
          [secondary_key]: _id,
        });
      }
    }
  return arr;
};
// Format Currency
const formatCurrency = (amount, currency_code = "en-IN") =>
  new Intl.NumberFormat(currency_code, {
    style: "currency",
    currency: "INR",
  }).format(amount);
// Get future days
const getFutureDays = (numberOfDays = 7) => {
  const arr = [...Array(numberOfDays).keys()].map((item, i) => {
    const nextDay = new Date();
    const futureDate = nextDay.getDate() + i;
    nextDay.setDate(futureDate);
    return nextDay;
  });
  return arr;
};
// Get day name with index and by default return today name
const getDayName = (dayIndex = new Date().getDay()) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[dayIndex];
};

module.exports = {
  getArrFromObj,
  getArrFromSnap,
  formatCurrency,
  getArrFromNestedSnap,
  getFutureDays,
  getDayName,
};
