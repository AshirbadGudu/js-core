# @ashirbad/js-core [![NPM version](https://img.shields.io/npm/v/@ashirbad/js-core.svg?style=flat)](https://www.npmjs.com/package/@ashirbad/js-core)

> Contains a set of javascript core utility functions

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
npm i @ashirbad/js-core
```

## Usage

```js
const { getArrFromObj } = require("@ashirbad/js-core");
```

### Example

```js
const { getArrFromObj } = require("@ashirbad/js-core");

const obj = {
  "user-1": {
    name: "User One",
    email: "user1@gmail.com",
  },
  "user-2": {
    name: "User Two",
    email: "user2@gmail.com",
  },
};

const arr = getArrFromObj(obj);

/* arr
[
    {
        id: "user-1", 
        name:"User One",
        email:"user1@gmail.com"
    },
    {
        id: "user-2", 
        name:"User Two",
        email:"user2@gmail.com"
    }
]
*/
```
