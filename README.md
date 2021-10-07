# js-helpers

> Contains a set of javascript helper functions

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
npm i @AshirbadGudu/js-helpers
```

## Usage

```js
const { getArrFromObj } = require("@AshirbadGudu/js-helpers");
```

### Example

```js
const { getArrFromObj } = require("@AshirbadGudu/js-helpers");

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
