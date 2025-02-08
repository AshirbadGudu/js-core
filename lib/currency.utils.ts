import { currency } from './types';

// Format Currency
const formatCurrency = (
  amount: number,
  currency_code: currency = 'INR'
): string =>
  new Intl.NumberFormat(currency_code, {
    style: 'currency',
    currency: currency_code,
  }).format(amount);

export { formatCurrency };
