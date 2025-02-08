import { day } from './types';

/**
 * Returns an array of future dates starting from today.
 *
 * @param {number} [numberOfDays=7] - The number of future days to generate
 * @returns {Date[]} An array of Date objects representing future dates
 *
 * @example
 * // Get next 3 days
 * const dates = getFutureDays(3);
 * // Result: [
 * //   2024-03-07T00:00:00.000Z,
 * //   2024-03-08T00:00:00.000Z,
 * //   2024-03-09T00:00:00.000Z
 * // ]
 *
 * @example
 * // Default usage (7 days)
 * const weekDates = getFutureDays();
 * // Returns array of next 7 days
 */
const getFutureDays = (numberOfDays = 7): Date[] => {
  const arr = Array.from(Array(numberOfDays).keys()).map((item, i) => {
    const nextDay = new Date();
    const futureDate = nextDay.getDate() + i;
    nextDay.setDate(futureDate);
    return nextDay;
  });
  return arr;
};

/**
 * Gets the name of a day by its index (0-6) or returns today's name if no index is provided.
 *
 * @param {number} [dayIndex=new Date().getDay()] - The day index (0 for Sunday, 1 for Monday, etc.)
 * @returns {day} The name of the day
 *
 * @example
 * // Get specific day name
 * getDayName(1); // "Monday"
 * getDayName(0); // "Sunday"
 * getDayName(6); // "Saturday"
 *
 * @example
 * // Get today's name (no argument)
 * getDayName(); // Returns current day name
 */
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

/**
 * Returns an array of dates between two dates (inclusive or exclusive of end date).
 *
 * @param {Date} startDate - The start date
 * @param {Date} endDate - The end date
 * @param {boolean} [includeEndDate=false] - Whether to include the end date in the result
 * @returns {Date[]} Array of dates between start and end dates
 *
 * @example
 * // Get dates between (exclusive)
 * const dates = getDatesBetween(
 *   new Date('2024-03-01'),
 *   new Date('2024-03-05')
 * );
 * // Result: [
 * //   2024-03-01T00:00:00.000Z,
 * //   2024-03-02T00:00:00.000Z,
 * //   2024-03-03T00:00:00.000Z,
 * //   2024-03-04T00:00:00.000Z
 * // ]
 *
 * @example
 * // Get dates between (inclusive)
 * const dates = getDatesBetween(
 *   new Date('2024-03-01'),
 *   new Date('2024-03-05'),
 *   true
 * );
 * // Result includes end date (2024-03-05)
 */
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
