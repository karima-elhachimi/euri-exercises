---
title: Javascript Modules Systems
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

## Javascript Modules Systems

<img src="./images/js-modules.jpg" width="400px" /><br>
<small>
Copyright (c) 2017-2019 Euricom nv.
</small>

<!-- markdownlint-disable -->
<br>
<style type="text/css">
.reveal h1 {
    font-size: 3.0em;
}
.reveal h2 {
    font-size: 2.00em;
}
.reveal h3 {
    font-size: 1.00em;
}
.reveal p {
    font-size: 70%;
}
.reveal blockquote {
    font-size: 80%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 90%;
}
</style>

---

# Javascript modules systems

- IIFE (Revealing Module Pattern)
- CommonJS (Node module pattern)
- AMD (Asynchronous Module Definition)
- UMD (Combination of IIFE, CommonJS, AMD)
- ES Modules (ECMAScript Modules)

<!-- prettier-ignore -->
***

## IIFE

<!-- prettier-ignore -->
***

```js
var myRevealingModule = (function () {
    var privateVar = "Ben Cherry",

    function privateFunction() {
        console.log( "Name:" + privateVar );
    }

    function publicSetName( strName ) {
        privateVar = strName;
    }

    return {
        setName: publicSetName,
        greeting: publicVar,
    };
})();
```

## CommonJS (CJS)

```js
// myLib.js
module.exports = {
  setName: function() {}
};

// main.js
const myLib = require("./mylib.js");
myLib.setName();
```

Used by nodeJS (webpack.config.js, .eslintrc.js, ...)

<!-- prettier-ignore -->
***

## ES Modules

myService.js

```js
export const MAX_LENGTH = 1000;  // named const export
export class Car() {             // named class export
    ...
}
const config = {
    ...
}
export default config;           // default (unnamed) export
```

main.js

```js
import config from "./service"; // default import
import { MAX_LENGTH, Car } from "./service"; // named imports

import * as lib from "./service"; // import all
console.log(lib.MAX_LENGTH);
const car = new lib.Car();
```
