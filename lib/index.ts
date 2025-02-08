import { currency, day } from './types';
import {
  FirebaseSnapshot,
  FirebaseNestedSnapshot,
  FirebaseFlatSnapshot,
} from './types/firebase';

// Convert an object to array
const getArrFromObj = <T extends Record<string, unknown>>(
  object: Record<string, T>,
  key = 'id',
  arr: Array<T & { [K: string]: string }> = []
): Array<T & { [K: string]: string }> => {
  for (const id in object) arr.push({ [key]: id, ...object[id] });
  return arr;
};

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

// Format Currency
const formatCurrency = (
  amount: number,
  currency_code: currency = 'INR'
): string =>
  new Intl.NumberFormat(currency_code, {
    style: 'currency',
    currency: currency_code,
  }).format(amount);

// Get future days
const getFutureDays = (numberOfDays = 7): Date[] => {
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
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[dayIndex];
};

// Create a function that returns array of dates between 2 dates
const getDatesBetween = (
  startDate: Date,
  endDate: Date,
  includeEndDate?: boolean
): Date[] => {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  if (includeEndDate) dates.push(endDate);
  return dates;
};

export {
  getArrFromObj,
  getArrFromSnap,
  getArrFromNestedSnap,
  formatCurrency,
  getFutureDays,
  getDayName,
  getDatesBetween,
};
