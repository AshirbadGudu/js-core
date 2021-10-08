# js-utils

> Contains a set of javascript utility functions

## Installation

Install with [npm](https://www.npmjs.com/):

```sh
npm i js-utils
```

## Usage

```js
const { getArrFromObj } = require("js-utils");
```

### Example

```js
const { getArrFromObj } = require("js-utils");

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
