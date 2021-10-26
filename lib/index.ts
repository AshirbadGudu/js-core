import { currency, day } from "./types";

// Convert an object to array
const getArrFromObj = (object: { [x: string]: any }, arr: any[] = []) => {
  for (const id in object) arr.push({ id, ...object[id] });
  return arr;
};
// Convert Firebase snapshot to array
const getArrFromSnap = (
  snap: { val: () => any; exists: () => boolean },
  key = "id",
  arr: any[] = []
) => {
  const snapVal = snap.val();
  if (snap.exists())
    for (const id in snapVal) arr.push({ ...snapVal[id], [key]: id });
  return arr;
};

// Get single array from a nested snapshot
const getArrFromNestedSnap = (
  snap: { val: () => any; exists: () => any },
  primary_key = "id",
  secondary_key = "_id",
  arr: any[] = []
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
const formatCurrency = (amount: number, currency_code: currency = "INR") =>
  new Intl.NumberFormat(currency_code, {
    style: "currency",
    currency: currency_code,
  }).format(amount);

// Get future days
const getFutureDays = (numberOfDays = 7) => {
  const arr = Array.from(Array(numberOfDays).keys()).map((item, i) => {
    const nextDay = new Date();
    const futureDate = nextDay.getDate() + i;
    nextDay.setDate(futureDate);
    return nextDay;
  });
  return arr;
};
// Get day name with index and by default return today name
const getDayName = (dayIndex = new Date().getDay()): day => {
  const days: day[] = [
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

export {
  getArrFromObj,
  getArrFromSnap,
  getArrFromNestedSnap,
  formatCurrency,
  getFutureDays,
  getDayName,
};
