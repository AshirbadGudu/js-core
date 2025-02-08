# @ashirbad/js-core

<div align="center">
  <h1>
    <code>@ashirbad/js-core</code>
  </h1>

  <div>A lightweight, type-safe JavaScript utility library with zero dependencies.</div>

  <br />

  <!-- Badges -->

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/AshirbadGudu/js-core/issues)
[![Maintained](https://badgen.net/badge/Maintained%20%3F/Yes%21/blue?icon=github)](https://github.com/AshirbadGudu/js-core/issues)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ashirbad/js-core)
![npm](https://img.shields.io/npm/v/@ashirbad/js-core)
![Downloads](https://img.shields.io/npm/dt/@ashirbad/js-core)
![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)

  <br />

  <pre>npm i <a href="https://www.npmjs.com/package/@ashirbad/js-core">@ashirbad/js-core</a></pre>

  <br />
</div>

## Features

- 🚀 **Zero Dependencies** - Lightweight and efficient
- 💪 **Type Safe** - Written in TypeScript with full type definitions
- 🔥 **Firebase Ready** - Built-in Firebase utilities
- 💰 **Currency Formatting** - Support for 160+ currencies
- 📅 **Date Utilities** - Comprehensive date manipulation tools
- ✨ **Modern** - ES6+ ready
- 🧪 **Well Tested** - 100% test coverage

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Array Utilities](#array-utilities)
  - [Currency Utilities](#currency-utilities)
  - [Date Utilities](#date-utilities)
- [Examples](#examples)
- [TypeScript Support](#typescript-support)
- [Contributing](#contributing)
- [License](#license)

## Installation

### npm

```bash
npm install @ashirbad/js-core
```

### yarn

```bash
yarn add @ashirbad/js-core
```

### pnpm

```bash
pnpm add @ashirbad/js-core
```

## Usage

Import the functions you need:

```typescript
import { formatCurrency, getDatesBetween } from '@ashirbad/js-core';
```

## API Reference

### Array Utilities

#### `getArrFromObj(object: Record<string, any>, key?: string): Array<any>`

Converts an object to an array with customizable ID field.

```typescript
const obj = { '1': { name: 'John' }, '2': { name: 'Jane' } };
const arr = getArrFromObj(obj); // [{ id: "1", name: "John" }, { id: "2", name: "Jane" }]
```

#### `getArrFromSnap(snapshot: FirebaseSnapshot, key?: string): Array<any>`

Converts a Firebase snapshot to an array.

```typescript
const arr = getArrFromSnap(snapshot); // [{ id: "doc1", ...data }]
```

#### `getArrFromNestedSnap(snapshot: FirebaseSnapshot, primaryKey?: string, secondaryKey?: string): Array<any>`

Flattens a nested Firebase snapshot into a single array. Useful for handling nested collections in Firebase.

```typescript
// Example Firebase nested data
const snapshot = {
  val: () => ({
    store1: {
      order1: { product: 'A', quantity: 1 },
      order2: { product: 'B', quantity: 2 },
    },
    store2: {
      order3: { product: 'C', quantity: 3 },
    },
  }),
  exists: () => true,
};

// Default keys
const result1 = getArrFromNestedSnap(snapshot);
/* Output:
[
  { id: 'order1', _id: 'store1', product: 'A', quantity: 1 },
  { id: 'order2', _id: 'store1', product: 'B', quantity: 2 },
  { id: 'order3', _id: 'store2', product: 'C', quantity: 3 }
]
*/

// Custom keys
const result2 = getArrFromNestedSnap(snapshot, 'orderId', 'storeId');
/* Output:
[
  { orderId: 'order1', storeId: 'store1', product: 'A', quantity: 1 },
  { orderId: 'order2', storeId: 'store1', product: 'B', quantity: 2 },
  { orderId: 'order3', storeId: 'store2', product: 'C', quantity: 3 }
]
*/
```

### Currency Utilities

#### `formatCurrency(amount: number, currency?: currency): string`

Formats a number as currency with proper localization.

```typescript
formatCurrency(1000); // "₹1,000.00"
formatCurrency(1000, 'USD'); // "$1,000.00"
formatCurrency(1000, 'EUR'); // "€1,000.00"
```

Supports 160+ currencies including:

- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- And many more...

### Date Utilities

#### `getFutureDays(numberOfDays?: number): Date[]`

Returns an array of future dates.

```typescript
getFutureDays(3); // Next 3 days as Date objects
```

#### `getDayName(dayIndex?: number): string`

Gets the name of a day by index (0-6).

```typescript
getDayName(1); // "Monday"
getDayName(); // Current day name
```

#### `getDatesBetween(startDate: Date, endDate: Date, includeEndDate?: boolean): Date[]`

Returns an array of dates between two dates.

```typescript
const dates = getDatesBetween(new Date('2024-01-01'), new Date('2024-01-05'));
```

## TypeScript Support

This library is written in TypeScript and includes type definitions. Types are automatically imported when using TypeScript.

```typescript
import { currency } from '@ashirbad/js-core';

const price: number = 1000;
const formattedPrice: string = formatCurrency(price, 'USD');
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

- Star this repository
- Report issues
- Submit Pull Requests
- Spread the word

---

Made with ❤️ by [Ashirbad Panigrahi](https://github.com/AshirbadGudu)
