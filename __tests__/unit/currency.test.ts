import { formatCurrency } from '../../lib';

describe('Currency Utilities', () => {
  describe('formatCurrency', () => {
    it('should format INR currency correctly', () => {
      expect(formatCurrency(1000)).toBe('₹1,000.00');
      expect(formatCurrency(1000.5)).toBe('₹1,000.50');
      expect(formatCurrency(1000000)).toBe('₹1,000,000.00');
    });

    it('should format USD currency correctly', () => {
      expect(formatCurrency(1000, 'USD')).toBe('$1,000.00');
      expect(formatCurrency(1000.5, 'USD')).toBe('$1,000.50');
      expect(formatCurrency(1000000, 'USD')).toBe('$1,000,000.00');
    });

    it('should format EUR currency correctly', () => {
      expect(formatCurrency(1000, 'EUR')).toBe('€1,000.00');
      expect(formatCurrency(1000.5, 'EUR')).toBe('€1,000.50');
      expect(formatCurrency(1000000, 'EUR')).toBe('€1,000,000.00');
    });

    it('should handle zero and negative values', () => {
      expect(formatCurrency(0)).toBe('₹0.00');
      expect(formatCurrency(-1000)).toBe('-₹1,000.00');
      expect(formatCurrency(-1000.5)).toBe('-₹1,000.50');
    });
  });
});
