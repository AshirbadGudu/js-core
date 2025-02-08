import { currency } from './types';

/**
 * Formats a number as currency with proper localization.
 *
 * @param {number} amount - The amount to format
 * @param {currency} [currency_code='INR'] - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'INR')
 * @returns {string} The formatted currency string
 *
 * @example
 * // Format Indian Rupees (default)
 * formatCurrency(1000); // "₹1,000.00"
 * formatCurrency(1000.5); // "₹1,000.50"
 *
 * @example
 * // Format US Dollars
 * formatCurrency(1000, 'USD'); // "$1,000.00"
 * formatCurrency(-1000, 'USD'); // "-$1,000.00"
 *
 * @example
 * // Format Euros
 * formatCurrency(1000, 'EUR'); // "€1,000.00"
 * formatCurrency(1000000, 'EUR'); // "€1,000,000.00"
 */
const formatCurrency = (
  amount: number,
  currency_code: currency = 'INR'
): string =>
  new Intl.NumberFormat(currency_code, {
    style: 'currency',
    currency: currency_code,
  }).format(amount);

export { formatCurrency };
