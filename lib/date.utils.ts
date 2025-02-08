import { day } from './types';

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

export { getFutureDays, getDayName, getDatesBetween };
