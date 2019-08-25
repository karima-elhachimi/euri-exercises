---
title: Javascript Modules Systems
transition: 'fade'
verticalSeparator: '---//'
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
    line-height: 35px;
    font-size: 120%;
}
</style>

---

## Javascript modules systems

- IIFE (Revealing Module Pattern)
- CommonJS (Node module pattern)
- AMD (Asynchronous Module Definition)
- UMD (Combination of IIFE, CommonJS, AMD)
- ES Modules (ECMAScript Modules)

---

## IIFE

> Immediately Invoked Function Expression

---//

## Revealing module pattern

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

---

## CommonJS (CJS)

> The nodeJS module pattern

---//

## CommonJS

```js
// myLib.js
module.exports = {
  setName: function() {},
};

// main.js
const myLib = require('./mylib.js');
myLib.setName();
```

Used by nodeJS (webpack.config.js, .eslintrc.js, ...)

---

## Asynchronous Module Definition (AMD)

> CommonJS in the browser

---//

## AMD

Powered by RequireJS

```js
// foo.js
define(['jquery'], function($) {
  // methods
  function myFunc() {}

  // exposed public methods
  return {
    doSomething: myFunc,
  };
});
```

```js
// main.js
require(['foo'], function(foo) {
  // rest of your code here
  foo.doSomething();
});
```

---

## Universal Module Definition (UMD)

> Combination of IIFE, CommonJS, AMD

---//

## UMD

```js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals (root is window)
    root.myLib = factory(root.jQuery);
  }
})(this, function($) {
  // this is where I defined my module implementation

  function myFunc() {}
  return {
    func: myFunc,
  };
});
```

---

## ES Modules (ESM)

> EcmaScript Module Pattern

---//

## ES Modules

myService.js

```js
// named export
export const MAX_LENGTH = 1000;
export class Car() {
    ...
}

// default (unnamed) export
const config = {
    ...
}
export default config;
```

main.js

```js
// default import
import config from './service';

// named imports
import { MAX_LENGTH, Car } from './service';
```

ES Modules are supported by WebPack, Babel & NodeJS 12+ (experimental)

---//

## ES Modules

More specialized imports

```js
// import all
import * as lib from './service';

console.log(lib.MAX_LENGTH);
const car = new lib.Car();
```

Alias

```js
import { Car as MyCar } from './service';

const car = new MyCar();
```

---

## Exercise

- Create a calculator calc.js with IIFE and use it in browser
- Create a calculator (calc.common.js) with CommonJS and use it in nodejs

```bash
# start by node
node index.js
```

- Create a calculator (calc.esm.js) with ES Modules and use it in nodejs

```bash
# use node-js starter (includes babel)
npm start
```

- Create a calculator (calc.umd.js) so you can use it in nodeJS and in browser
