/**
 * @ashirbad/js-core
 * A lightweight, type-safe JavaScript utility library with zero dependencies.
 *
 * @packageDocumentation
 */

// Array utilities
export { getArrFromObj } from './array.utils';

// Firebase utilities
export { getArrFromSnap, getArrFromNestedSnap } from './firebase.utils';

// Currency utilities
export { formatCurrency } from './currency.utils';

// Date utilities
export { getFutureDays, getDayName, getDatesBetween } from './date.utils';

// Type exports
export * from './types';
export * from './types/firebase';
