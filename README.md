<div align="center">
  <h1>
    <code>
      @ashirbad/js-core
    </code> 
  </h1>

  <div>JavaScript utility functions library, ready to use, written in Typescript.</div>

  <br />

  <!-- Badges -->

[![Open Source? Yes!](https://badgen.net/badge/Open%20Source%20%3F/Yes%21/blue?icon=github)](https://github.com/AshirbadGudu/js-core/issues)
[![Maintained](https://badgen.net/badge/Maintained%20%3F/Yes%21/blue?icon=github)](https://github.com/AshirbadGudu/js-core/issues)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ashirbad/js-core)
![npm](https://img.shields.io/npm/v/@ashirbad/js-core)
![Downloads](https://img.shields.io/npm/dt/@ashirbad/js-core)

  <!-- BADGE:END -->

  <br />
    <pre>npm i <a href="https://www.npmjs.com/package/@ashirbad/js-core">@ashirbad/js-core</a></pre>
  <br />

</div>

## API

All the available utility function inside `@ashirbad/js-core`

| Name                       | Description                                                    | More |
| -------------------------- | -------------------------------------------------------------- | ---- |
| **`getArrFromObj`**        | Convert an object of object to array.                          |      |
| **`getArrFromSnap`**       | Convert Firebase snapshot to array.                            |      |
| **`getArrFromNestedSnap`** | Get single array from a firebase nested snapshot.              |      |
| **`formatCurrency`**       | Convert any number to a formatted currency.                    |      |
| **`getFutureDays`**        | Get future 7 days.                                             |      |
| **`getDayName`**           | Get day name with index and by default return today name.      |      |
| **`getDatesBetween`**      | Create a function that returns array of dates between 2 dates. |      |

## Examples

### getArrFromObj

```typescript
import { getArrFromObj } from "@ashirbad/js-core";

const LangsObj = { "l-1": { name: "JS" }, "l-2": { name: "TS" } };

const LangsArr = getArrFromObj(LangsObj);

/** Output
 * [{"id":"l-1","name":"JS"},{"id":"l-2","name":"TS"}]
 * */
```

### getArrFromSnap

```typescript
import { getArrFromSnap } from "@ashirbad/js-core";

const LangsSnap = {
  val: () => ({ "l-1": { name: "JS" }, "l-2": { name: "TS" } }),
  exists: () => true,
};

const LangsArr = getArrFromSnap(LangsSnap);

/** Output
 * [{"id":"l-1","name":"JS"},{"id":"l-2","name":"TS"}]
 * */
```

### getArrFromNestedSnap

```typescript
import { getArrFromNestedSnap } from "@ashirbad/js-core";

const LangsSnap = {
  val: () => ({
    "l-1": { JS: { name: "JavaScript" } },
    "l-2": { TS: { name: "TypeScript" } },
  }),
  exists: () => true,
};

const LangsArr = getArrFromNestedSnap(LangsSnap, "lang-code", "lang-id");

/** Output
[
  { name: "JavaScript", "lang-code": "JS", "lang-id": "l-1" },
  { name: "TypeScript", "lang-code": "TS", "lang-id": "l-2" },
]
* */
```

### formatCurrency

```typescript
import { formatCurrency } from "@ashirbad/js-core";

const price = 2999;

formatCurrency(price); // ₹2,999.00
formatCurrency(price, "USD"); // $2,999.00
formatCurrency(price, "AED"); // AED 2,999.00
```

### getDatesBetween

```typescript
import { getDatesBetween } from "@ashirbad/js-core";

getDatesBetween(new Date("2020-01-01"), new Date("2020-01-03"));
// Output: ["2020-01-01T00:00:00.000Z","2020-01-02T00:00:00.000Z"]
```
