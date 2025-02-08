import { getFutureDays, getDayName, getDatesBetween } from '../../lib';

describe('Date Utilities', () => {
  describe('getFutureDays', () => {
    it('should return an array of future dates', () => {
      const days = getFutureDays(3);
      expect(days).toHaveLength(3);
      expect(days[0]).toBeInstanceOf(Date);
      
      // Verify dates are sequential
      for (let i = 1; i < days.length; i++) {
        const diffInDays = (days[i].getTime() - days[i-1].getTime()) / (1000 * 60 * 60 * 24);
        expect(Math.round(diffInDays)).toBe(1);
      }
    });

    it('should default to 7 days if no argument provided', () => {
      const days = getFutureDays();
      expect(days).toHaveLength(7);
    });
  });

  describe('getDayName', () => {
    it('should return correct day name for given index', () => {
      expect(getDayName(0)).toBe('Sunday');
      expect(getDayName(1)).toBe('Monday');
      expect(getDayName(6)).toBe('Saturday');
    });

    it('should return today\'s name when no argument provided', () => {
      const today = new Date();
      const expectedDayName = getDayName(today.getDay());
      expect(getDayName()).toBe(expectedDayName);
    });
  });

  describe('getDatesBetween', () => {
    it('should return array of dates between start and end date', () => {
      const start = new Date('2024-02-01');
      const end = new Date('2024-02-05');
      const dates = getDatesBetween(start, end);
      
      expect(dates).toHaveLength(4); // excludes end date by default
      expect(dates[0]).toEqual(new Date('2024-02-01'));
      expect(dates[dates.length - 1]).toEqual(new Date('2024-02-04'));
    });

    it('should include end date when includeEndDate is true', () => {
      const start = new Date('2024-02-01');
      const end = new Date('2024-02-05');
      const dates = getDatesBetween(start, end, true);
      
      expect(dates).toHaveLength(5);
      expect(dates[dates.length - 1]).toEqual(end);
    });

    it('should return empty array if start date is after end date', () => {
      const start = new Date('2024-02-05');
      const end = new Date('2024-02-01');
      const dates = getDatesBetween(start, end);
      
      expect(dates).toHaveLength(0);
    });
  });
}); 