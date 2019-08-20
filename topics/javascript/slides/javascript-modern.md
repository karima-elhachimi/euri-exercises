---
title: Javascript modern features
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

## Javascript modern features

<img src="./images/modern_javascript.png" width="400px" /><br>
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

# The Basics

> What you probably already know.

<!-- prettier-ignore -->
***

## The let keyword

```js
    // ES5 - function scoping
    var message = 'hi';
    function greet() {
        var message = 'bye';
    }
    greet();                  --> Output ?
```

```js
    // ES5 - block scoping
    var message = 'hi';
    {
        var message = 'bye';
    }
    console.log(message)      --> output: ?
```

<!-- .element: class="fragment" data-fragment-index="1" -->

```js
    // ES6 - block scoping with let
    let message = 'hi';
    {
        let message = 'bye';
    }
    console.log(message)      --> output: ?
```

<!-- .element: class="fragment" data-fragment-index="2" -->

<!-- prettier-ignore -->
***

## The const keyword

```js
// ES5
var message = "hi";
return message;

// ES6
const message = "hi";
message = "hello" < --ERROR;
```

> const is not immutable!

<!-- .element: class="fragment" data-fragment-index="2" -->

```js
const names = [];
names.push( "Jordan" );     <-- No Error
console.log( names );
```

<!-- .element: class="fragment" data-fragment-index="3" -->

'const' defines a constant Reference, Not a Value

<!-- .element: class="fragment" data-fragment-index="3" -->

<!-- prettier-ignore -->
***

### Property value shorthand

```js
// ES3/ES5
function getCar(make, model, value) {
  return {
    make: make,
    model: model,
    value: value
  };
}
```

vs

```js
// ES6
// With property value shorthand syntax, you can omit the property
// value if key matches variable name.
function getCar(make, model, value) {
  return {
    make,
    model,
    value
  };
}
```

<!-- prettier-ignore -->
***

### Method definition shorthand

```js
// ES5
function getCar(make, model, value) {
  return {
    depreciate: function() {
      this.value -= 2500;
    }
  };
}
```

vs

```js
// ES6
// Method definition shorthand syntax omits `function` keyword & colon
function getCar(make, model, value) {
  return {
    depreciate() {
      this.value -= 2500;
    }
  };
}
```

<!-- prettier-ignore -->
***

## The arrow function

Simpler syntax

```js
const createGreeting = function(message, name) {
  return message + name;
};

// version 1
const arrowGreeting = (message, name) => {
  return message + name;
};

// version 2
const arrowGreeting = (message, name) => message + name;
```

<!-- prettier-ignore -->
***

## The arrow function

```js
const service = {
  foo: "peter",
  delayLog(timeout) {
    setTimeout(
      function() {
        console.log(this.foo);
      }.bind(this),
      timeout
    );
  }
};
service.delayAction(500);
```

```js
// Easier with arrow function
const service = {
  foo: "peter",
  delayAction(timeout) {
    delayLog(() => {
      console.log(this.foo);
    }, timeout);
  }
};
```

<!-- .element: class="fragment" data-fragment-index="2" -->

<!-- prettier-ignore -->
***

### The arrow function - Not to use

Event Handlers

```js
class player {
  constructor(name) {
    this.name = name;
    this.elm = document.createElement("div");
    this.elm.addEventListener("click", this.sayHello);
  }
  sayHello() {
    console.log(this.name + ' say: "hello!"'); // 'undefined say 'hello!"';
  }
}
```

Object Methods

```js
const person = {
  points: 23,
  score: () => {
    this.points++; // no error but doesn't work
  }
};
```

<!-- prettier-ignore -->
***

### The arrow function - Not to use

Prototype methods

```js
class Car {
  constructor(make, colour) {
    this.make = make;
    this.colour = colour;
  }
}

Car.prototype.summarize = () => {
  return `This car is a ${this.make} in the colour ${this.colour}`;
};
```

<!-- prettier-ignore -->
***

### The class

```js
// ES6
class Car {
  constructor(make, model, value) {
    this.make = make;
    this.model = model;
    this.value = value;
  }
  depreciate() {
    this.value -= 2500;
  }
}
```

```js
// ES5 constructor function
function Car(make, model, value) {
  this.make = make;
  this.model = model;
  this.value = value;
}

Car.prototype.depreciate = function() {
  this.value -= 2500;
};
```

<!-- prettier-ignore -->
***

## Classes don't hoist

```js
// this works
var foo = new Foo(1, 2);
function Foo(x, y) {
  this.x = x;
  this.y = y;
}

// ReferenceError
var foo = new Foo(1, 2);
class Foo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
```

<!-- prettier-ignore -->
***

## The TypeScript class

```js
// TypeScript
class Car {
  model: String  // <-- class property

  constructor(private make: String, private value: Number, model: String) {
      this.model = model;
  }

  depreciate() {
      this.value -= 2500;
  }
}
```

<small>Class properties will be supported in ES9</small>

<!-- prettier-ignore -->
***

### Don't overuse classes!

```js
export class Utils {
  trim(text) {}
  parseDate(dateString) {}
}

import { Util } from "./util";
var utils = new Util();
utils.trim(" abc    ");
```

The class don't hold state, better to use functions

```js
export const trim = (text) => {
    ...
}
export const parseDate = (dateString) => {
    ...
}

import { trim } from './util'
trim(' abc    ');
```

<!-- prettier-ignore -->
***

## String interpollation

Multiline with interpollation

```js
const message = "world";
const template = `
        <div>
            <span>Hello ${message}</span>
        </div>
    `;
```

```js
const message = `1 and 1 make ${1 + 1}`;
console.log(message);
```

Inside (\${ and }) is treated as a JavaScript expression

> No more string concatenation!

<!-- prettier-ignore -->
***

## Default Arguments

```js
const myFunction = function(a, b, c) {
  a = a || 10;
  b = b || 5;
  c = c || 8;
  return a * b * c;
};
```

```js
const myFunction = function(a = 10, b = 5, c = 8) {
  return a * b * c;
};
```

```js
const INITIAL_STATE = { ... }
var myFunction = function(state = INITIAL_STATE, action){
    ...
};
```

<!-- prettier-ignore -->
***

## Computed properts

```js
// ES3/ES5
function getCar(make, model, value) {
  var car = {};
  car["make" + make] = true;
  return car;
}

var o = getCar("Bmw", "5", 50000);
o.makeBmw === true;
```

vs

```js
// ES6
// Computed values now work with object literals
function getCar(make, model, value) {
  return {
    ["make" + make]: true
  };
}
```

<!-- prettier-ignore -->
***

## Property accessors

```js
function getCar(make, model, value) {
  return {
    _value: value,
    get value() {
      return this._value;
    },
    set value(value) {
      if (value < 0) throw new Error("invalid value");
      this._value = value;
    }
  };
}

let car = getCar("Volvo", "V70", 30000);
console.log(car.value); // OUTPUT: 30000
car.value = -1; // <- ERROR
```

<small>A less known ECMAScript 5 feature</small>

<!-- prettier-ignore -->
***

### Property accessors in class

```js
class Car {
  constructor(make, value) {
    this.make = make;
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    if (value < 0) throw new Error("invalid value");
    this._value = value;
  }
}
```

<!-- prettier-ignore -->
***

## Computed property accessor names

```js
var expr = "foo";

var obj = {
  get [expr]() {
    return "bar";
  }
};

console.log(obj.foo); // "bar"
```

<!-- prettier-ignore -->
***

### Looping over array and object properties

```js
const list = ["john", "zoo", "bar"];

// ES5
for (var i = 0, len = list.length; i < len; i++) {
  console.log(list[i]);
}
// this is slow in big arrays
list.forEach(function(item) {
  console.log(item);
});
```

```js
// ES6+
for (let item of list) {
  console.log(item);
}
// ES6+ loop over properties of an object
const obj = { name: "peter", age: 12 };
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

---

# More ES6+

> What you should know.

<!-- prettier-ignore -->
***

## Rest operator

```js
// ES5: remember this one
function join() {
  var arg = Array.prototype.slice.call(arguments);
  var separator = arg[0];
  arg.shift();
  return arg.join(separator);
}
console.log(join("//", "one", "two", "three"));
```

```js
// ES6: easy
function join(separator, ...values) {
  return values.join(separator);
}
```

<!-- prettier-ignore -->
***

## Spread operator

```js
function volume(width, length, height) {
  return width * length * height;
}

console.log(volume(...[2, 8, 5]));
```

Modify an immutable array

```js
// mutable change
function addElement(array, element) {
  array.push(element);
  return array;
}

// immutable change, pure function (redux!)
function addElement(array, element) {
  return [...array, element];
}
```

<!-- prettier-ignore -->
***

## Spread operator

Clone an array

```js
// old way
const newArray = oldArray.splice(0);
```

```js
//es6 way
const newArray = [...oldArray];
```

Combine two arrays

```js
var x = [1, 2];
var y = [3, 4];
x.push(...y); // x is [1, 2, 3, 4]
```

<!-- prettier-ignore -->
***

## Object Destructuring

```js
var myConfig = {
  url: "www.google.com/api",
  data: "some value",
  methodType: "POST"
};

// ES5
function makeAjaxRequest(config) {
  var url = config.url;
  var method = config.methodType;
  var data = config.data;
  console.log(url, method, data);
}
```

```js
// ES6
function makeAjaxRequest(config) {
  var { url, methodType, data } = config;
  console.log(url, methodType, data);
}
```

<!-- prettier-ignore -->
***

## Destructuring

We can destruct nested objects

```js
const store = {
  customer: { name: "euricom", location: "mechelen" },
  pending: false,
  addCustomer(arg) {
    // ....
  }
};

const {
  customer: { name },
  addCustomer
} = store;
console.log(name);
addCustomer(arg);
```

<!-- prettier-ignore -->
***

## Array Destructuring

```js
// Array destructuring: uses an iterator to get to the elements of a source
let [x, ...y] = "abc"; // x='a'; y=['b', 'c']
```

Combines desctructering with spread operator

```js
// ES5 - Result of multiple promises
Promise.all([promiseGetUsers, promiseGetCustomers]).then(result => {
  var users = result[0];
  var customers = result[1];
  console.log(users, customers);
});

// ES6: Array destructuring result
Promise.all([promiseGetUsers, promiseGetCustomers]).then(([users, customers]) => {
  console.log(users, customers);
});
```

Less lines to write, less confusion

---

# ES.next features

> This is good to know (and to use today!)

<!-- prettier-ignore -->
***

### Class Fields

```js
class MyClass {
  myProp = 42;
  static myStaticProp = 21;
  constructor() {}
}
```

<small>Babel plugins:[@babel/plugin-proposal-class-properties], TS 1.5+ </small>

> Yes more typescript like

<!-- prettier-ignore -->
***

## Object spread operator

```js
    const myObject = { id: 12345, name: 'abc' }

    // my immutable object change
    const newObject = {
        ...myObject
        id: 54321
    }
```

<small>Babel plugins:[@babel/plugin-proposal-object-rest-spread], TS 2.0+ </small>

> Great for immutable objects!

<!-- prettier-ignore -->
***

## Decorators

```js
// A simple decorator
@Annotation
class MyClass {}

function Annotation(target) {
  target.annotated = true; // Add a property on target
}

console.log(MyClass.annotated); // true
```

```js
// A decorator with argument
@displayName("Auto")
class Car {}

function displayName(name) {
  return function(target) {
    target.displayName = name;
  };
}
```

A decorator is just a function

<!-- prettier-ignore -->
***

## Decorators

To enable decorators you must add a babel plugin

[@babel/plugin-proposal-decorators](https://github.com/babel/babel/tree/master/packages/babel-plugin-proposal-decorators)

```
{
    "presets": ["@babel/preset-env"],
    "plugins": ["@babel/plugin-proposal-decorators"]
}
```

<!-- prettier-ignore -->
***

### Trailing Function Commas

```js

    // Trailing commas are ignored in object literals and arrays
    const myObject = {
        id: 1234,
        name: 'peter',
    }
    const cities = {
        'antwerp',
        'mechelen',
        'brussel',
    }
```

```js
    // ES8 - makes it possible on function arguments
    function doThis(
        commandName,
        isMandatory,
    )
```

https://github.com/tc39/proposal-trailing-function-commas

<small>ES8<br>Babel plugins:[syntax-trailing-function-commas], TS 2.0 </small>

<!-- prettier-ignore -->
***

### Private fields #

T.B.D
https://dev.to/gafi/7-new-exciting-javascript-features-you-need-to-know-1fkh
https://github.com/tc39/proposal-class-fields

<!-- prettier-ignore -->
***

### Optional Chaining ?.

T.B.D
https://dev.to/gafi/7-new-exciting-javascript-features-you-need-to-know-1fkh
https://github.com/tc39/proposal-optional-chaining

<!-- prettier-ignore -->
***

### Nullish Coalescing ??

T.B.D
https://dev.to/gafi/7-new-exciting-javascript-features-you-need-to-know-1fkh
https://github.com/tc39/proposal-nullish-coalescing

<!-- prettier-ignore -->
***

### BigInt

T.B.D
https://dev.to/gafi/7-new-exciting-javascript-features-you-need-to-know-1fkh
https://github.com/tc39/proposal-bigint

<!-- prettier-ignore -->
***

### Top Level await

T.B.D
https://dev.to/gafi/7-new-exciting-javascript-features-you-need-to-know-1fkh
https://github.com/tc39/proposal-top-level-await

```js
// db.mjs
export const connection = await createConnection();
```

```js
// server.mjs
import { connection } from './db.mjs';

server.start();
```

---

# Less used Javascript

> Now you know

<!-- prettier-ignore -->
***

### Generators

The basics

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
}
```

```js
// get an iterator
const it = foo();

// get the result
it.foo();     // 1
it.foo();     // 2
it.foo();     // 3
...

// loop over
for(const i of it) {
    console.log(i)
}
```

<!-- prettier-ignore -->
***

### Generators

More practical example

```js
const activeUsers = filter(users, function(user) {
  return user.isActive;
});
const ages = map(activeUsers, function(user) {
  return user.age;
});
```

```js
function* map(items, transform) {
  for (item of items) yield transform(item);
}
function* filter(items, predicate) {
  for (item of items) if (predicate(item)) yield item;
}
```

```js
for (const user of activeUsers) {
  console.log(user);
}
```

<!-- prettier-ignore -->
***

## Symbols

Properties of an object can be either a string (as in ES5)
or symbol (new in ES6)

```js
var key = Symbol("key");
const myObject = {
  [key]: "abc"
};
```

Can be used as private variable

```js
    var key = Symbol("key");

    class MyClass {
        constructor(privateData) {
            this[key] = privateData;
        }
    }

    var x = new MyClass('hello')
    console.log(JSON.stringify(x))    > Output: {}
```

<!-- prettier-ignore -->
***

## String interpollation

Tagged templates

```js
const id = 1;
const query = graphql`
        query {
            user(id: ${id})
        }
    `;

function grahql(literals, ...placeholders) {
  console.log("literals", literals);
  console.log("placeholder", placeholders);
  console.log("raw", literals.raw[0]);
}
```

You get the opportunity to pre process the template string literals plus the values.

---

# Objects, Arrays, String

> Common functions

<!-- prettier-ignore -->
***

## Object functions

Common used object functions

```js
const a = { name: "peter" };
const b = Object.assign({}, a, { age: 12 }); // { name: 'peter', age: 12 }

const b = { ...a, age: 99 }; // { name: 'peter', age: 99 }

Object.keys({ name: "peter", age: 12 }); // [ 'name', 'age' ]

NaN == NaN; // false
isNan(NaN); // true
Object.is(NaN, NaN); // true

Object.create(Object.prototype); // {}
```

<!-- prettier-ignore -->
***

## String functions

```js
"abc ".trim(); // 'abr'
"hello world".includes("world"); // true
"hello world".startWith("hello"); // true

"hello world".indexOf("world"); // 6 (ES5 version of includes)
```

---

# Resources

> More to know

<!-- prettier-ignore -->
***

## Resources

- [You-Dont-Know-JS Book series](https://github.com/getify/You-Dont-Know-JS)
- [Frontendmasters - Kyle Simpson](https://frontendmasters.com/courses/)
- [JavaScript Weekly](http://javascriptweekly.com/)
- [TOP 10 JAVASCRIPT TRAPS FOR A C# DEVELOPER](http://prasadhonrao.com/top-10-javascript-traps-for-a-csharp-developer/)

---

# May the JS-Force be with you
