---
title: JavaScript Refresh
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# JavaScript Refresh

#### All you need to know to build React apps

<small>by Peter Cosemans</small>
<br>
<br>
<small>
Copyright (c) 2018 Euricom nv. Licensed under the [MIT license](https://opensource.org/licenses/MIT).
</small>

<!-- markdownlint-disable -->
<br>
<style type="text/css">
.reveal section img {
    background:none;
    border:none;
    box-shadow:none;
}
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
    font-size: 100%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 100%;
}
</style>

---

# Learn Javascript

<img src="./images/js-books.jpg" width="400px" /><br>

> https://github.com/getify/You-Dont-Know-JS

---

# JavaScript Versions

- JavaScript
- ECMAScript
- ECMAScript 5 (ES5) - 2009
- ECMAScript 6 (ES6/ES2015) - 2015
- ECMAScript 2016 (ES7) - 2016
- ECMAScript 2017 - 2017
- ES.Next

Note:

- ECMAScript: A language standardized by ECMA International.
- JavaScript: The commonly used name for implementations of the ECMAScript standard
- ECMAScript 5 (ES5): The 5th edition of ECMAScript, standardized in 2009
- ECMAScript 6 (ES6/ES2015): The 6th edition of ECMAScript, standardized in 2015.
- ECMAScript 2016: The 7th edition of ECMAScript

<!-- prettier-ignore -->
***

## ES6+ Today

<img src="./images/compatibility-table.png" width="1000px" /><br>

- Edge, Chrome, Firefox and Safari: +97%
- Node 8.x: +98%

> [http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)

---

# What you should know

> A quick course on JavaScript

<!-- prettier-ignore -->
***

## Var, Let, Const

```js
// ES5 style
var name = 'Peter';

// ES6 style
const name = 'Peter';
let value = 10;
value = 11;

// It's a constant reference, not constant value
const obj = { name: 'peter' };
obj.name = 'bob'; // no error
```

> In ES6+ always prefer `const` and `let` over `var`.

<!-- prettier-ignore -->
***

## Functions

You can define a function on multiple ways

```js
// Function Declaration
function foo(){
    ...
}

// Function Expression
const bar = function(arg){
    ...
};

// Function in objects
const obj = {
  name: 'Peter',
  bar: function(arg) {  // ES5 style
  },
  foo() {               // ES6 style
  }
}
```

<!-- prettier-ignore -->
***

## Arrow Functions

The modern way of defining a function

```js
// Function Expression (ES5)
const bar = function(arg){
    ...
};

// Arrow function expression (ES6)
const bar = (arg) => {

}
```

<!-- prettier-ignore -->
***

## Arrow Functions

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

## Arrow Functions

Simpler syntax

```js
const createGreeting = function(message, name) {
  return {
    message,
    name,
  };
};

// multi line return
const createGreeting = (message, name) => ({
  message,
  name,
});
```

<!-- prettier-ignore -->
***

# this

The value of the this reference is defined by the following rules:

- new operator
- Arrow function
- Hard binding
- Explicit binding
- The call context

<!-- prettier-ignore -->
***

## this

### The call context

```js
const obj = {
  name: 'peter',
  doThis() {
    console.log(this.name);
  },
};

obj.doThis(); // output: 'peter'
```

Follow the dot (.)

<!-- prettier-ignore -->
***

## this

### Explicit binding

```js
function doThis(prefix) {
  console.log(prefix + ' ' + this.name);
}

const otherObj = { name: 'john' };
doThis.call(otherObj, 'Mr'); // output: 'Mr john'
doThis.apply(otherObj, ['Sir']); // output: 'Sir john'
```

Use 'call' or 'apply'

<!-- prettier-ignore -->
***

## this

### Hard binding

```js
function doThis() {
  console.log(this.name)
}

const obj = { name: 'john'};
const fn = doThis.bind(otherObj);
fn(otherObj)   // output: 'john'

// other example
const car = {
    name: 'Bmw'
    start() {
        setTimeout(function() {
            console.log(this.name + ' started')
        }.bind(this), 1000)
    }
}
car.start();        // output: Bmw started
```

<!-- prettier-ignore -->
***

## this

### arrow function

```js
const car = {
    name: 'Bmw'
    start() {
        setTimeout(() => {    // arrow function
            console.log(this.name + ' started')
        }, 1000)
    }
}
```

It's hard binding to the outer scope

<!-- prettier-ignore -->
***

## this

### New operator

```js
// Constructor function
function User(name) {
  this.name = name;
}
const user = new User('peter');
user.name; // 'peter'
```

```js
// ES6 class
class User {
  constructor(name) {
    this.name = name;
  }
}
const user = new User('peter');
user.name; // 'peter'
```

<!-- prettier-ignore -->
***

## Spread operator

```js
const myObject = { id: 12345, name: 'abc' }

// combine object with all properties of other
const newObject = {
    ...myObject
    id: 54321
}

// copy array
const newArray = [...oldArray];

// Combine two arrays
const x = [1, 2];
const y = [3, 4];
x.push(...y); // x is [1, 2, 3, 4]
```

<!-- prettier-ignore -->
***

## Destructuring

```js
const myConfig = {
  url: 'www.google.com/api',
  data: 'some value',
  methodType: 'POST',
};

const { url } = myConfig;
```

destructor the arguments

```js
function getData({ url }) {
  console.log(url);
}
getData(myConfig);
```

<!-- prettier-ignore -->
***

## Destructuring

We can destruct nested objects

```js
const store = {
  customer: { name: 'euricom', location: 'mechelen' },
  pending: false,
  addCustomer(arg) {
    // ....
  },
};

const {
  customer: { name },
  addCustomer,
} = store;
console.log(name);
addCustomer(arg);
```

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
@displayName('Auto')
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

[babel-plugin-transform-decorators-legacy](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy)

```
{
    "preset": "react",
    "plugins": ["transform-decorators-legacy"]
}
```

---

# Modules

> Structure your code

<!-- prettier-ignore -->
***

## CommonJS (CJS)

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
import config from './service'; // default import
import { MAX_LENGTH, Car } from './service'; // named imports

import * as lib from './service'; // import all
console.log(lib.MAX_LENGTH);
const car = new lib.Car();
```

---

# Array functions

> makes your live easier

<!-- prettier-ignore -->
***

## Array handling

Our array

```js
const companies = [
  { id: 1, name: 'Acme', category: 'finance', employees: 5 },
  { id: 4, name: 'Globe', category: 'tech', employees: 1010 },
  { id: 2, name: 'Soylent', category: 'food', employees: 120 },
];
```

Usefull Array functions

`forEach`, `map`, `reduce`, `filter`, `sort`, `find`

<!-- prettier-ignore -->
***

## Array - for loops

Good old for loop (don't use it)

```js
for (let i = 0; i < companies.length; i++) {
  console.log(item);
}
```

Prefere

```js
// forEach (loop over all items)
companies.forEach(item => {
  console.log(item);
});
```

or

```js
// ES6 version
for (let item of companies)
  console.log(item)
})
```

<!-- prettier-ignore -->
***

## Array - Mapping

Good old for loop

```js
const companyNames = [];
for (let i = 0; i < companies.length; i++) {
  names.push(companies[i].name);
}
```

Prefered

```js
const companyNames = companies.map(item => {
  return item.name;
}

// or even shorter
const companyNames = companies.map(item => item.name)
```

<!-- prettier-ignore -->
***

## Array - for loops

Other example (transform property)

```js
const transformed = companies.map(item => {
  return {
    id: item.id.toString(),
    name: item.name;
  }
})
```

<!-- prettier-ignore -->
***

### Array - Calculation (sum, group, ...)

Old style

```js
const totEmployees = 0;
for (let i = 0; i < companies.length; i++) {
  totEmployees += companies.employees;
}
```

Prefere

```js
// reduce
const totEmployees = companies.reduce((acc, item) => {
  return acc + item.employees;
}, 0);
```

<!-- prettier-ignore -->
***

### Array - Filter, Find and Sort

```js
// filter
const bigCompanies = companies.filter(item => {
  return item.employees > 1000;
});

// filter: short version
const bigCompanies = companies.filter(item => item.employees > 1000);

// find
const acme = companies.find(item => item.name === 'Acme');

// sort
const sortedCompanies = companies.sort((a, b) => a.name > b.name);
```

<small>[JavaScript Higher Order Functions & Arrays Youtube](https://www.youtube.com/watch?time_continue=495&v=rRgD1yVwIvE)</small>

<!-- prettier-ignore -->
***

## Examples of use

Chain functions

```js
const sortedNames = companies.map(item => item.name).sort((a, b) => a > b);
```

Add item to array

```js
const name = 'Wolfoods';
const newId = companies.reduce((acc, item) => Math.max(acc, item.id), 0) + 1;
companies.push({
  id: newId,
  name,
});
```

<!-- prettier-ignore -->
***

## Examples of use

Remove an item from an array (don't use splice)

```js
const idToRemove = 999;
companies = companies.filter(item => item.id === idToRemove);
```

Find and update an item

```js
const company = companies.find(item => item.id === 1);
company.name = 'Other name';
```

---

# Async

> Handle it in the future.

<!-- prettier-ignore -->
***

### Promises

Making async methods calls via promise

```js
myAsyncAction(arg)
  .then(result => {
    // successfull result
  })
  .catch(err => {
    // error
  });
```

You can chain multiple async methods

```js
// step 1
myAsyncAction(arg)
  .then(result => {
    // step 2
    return myOtherAction(result.name); // returns a promise
  })
  .catch(err => {
    // common error handling
  });
```

<!-- prettier-ignore -->
***

### Promises

Wait for multiple promises

```js
const p1 = myAsyncAction(123);
const p2 = myOtherAction('peter');
Promise.all([p1, p2]).then(results => {
  console.log(results); // [3, "foo"]
});
```

<!-- prettier-ignore -->
***

### Async/await

```js
function getCustomers() {
  return http
    .get('/api/customers')
    .then(result => {
      customers = result.data;
      return customers;
    })
    .catch(err => {
      console.log(err);
      return [];
    });
}
```

```js
async function getCustomers() {
  try {
    const result = await http.get('/api/customers');
    return result.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```

<!-- prettier-ignore -->
***

### Generators

```js
async function getCustomers() {
  try {
    const result = await http.get('/api/customers');
    return result.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```

```js
function* getCustomers() {
  try {
    const result = yield http.get('/api/customers');
    return result.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```

---

# Immutability

> No Mutants Allowed

<!-- prettier-ignore -->
***

## A pure function

```js
function sum(a, b) {
  return a + b;
}
```

An impure function

```js
const count = 1;
function inc(v) {
  count += v;
}
```

inc() is impure because it changes count outside its scope

<!-- prettier-ignore -->
***

## A pure function

- The function always returns the same result for the same arguments.
- The function does NOT produce any observable side effects.

What are side effects:

- Making a HTTP request
- Mutating data
- DOM Query/Manipulation
- Math.random()
- Getting the current time

<!-- prettier-ignore -->
***

## Immutable

Immutable change - don't change, create a new one

```
let number = 10;
let obj = { name: 'peter' };
const refObj = obj;

// don't change, replace
number = 12;
obj = { name: 'john' }
```

<!-- prettier-ignore -->
***

## Immutable

With objects

```js
// copy object and update
obj = {
  name: obj.name,
  id: 12
}

// using Object.assign
obj = Object.assign(obj, {
  id: 12
})

// using ES6 spread operator
obj = {
  ...obj,
  id: 12
})
```

<!-- prettier-ignore -->
***

### Pure function

A pure function with immutable change

```js
const obj = { name: 'john' };

// BAD
function updatedName(obj, newName) {
  obj.name = newName;
  return obj;
}

// GOOD
function updatedName(obj, name) {
  // for a pure function never change
  // the input arguments
  return {
    ...obj, // spread operator is your friend
    name,
  };
}

const updatedObj = updatedName(obj, 'peter');
```

<!-- prettier-ignore -->
***

## Immutable changes

```js
// object
const obj = { name: 'bob' };
const newObj = { ...obj, name: 'peter' };

// array push
const array = [1, 2, 3];
const newArray = [...array, 12]; // [1, 2, 3, 4]

// array remove by id
const array = [{ id: 1, name: 'bob' }, { id: 2, name: 'peter' }];
const newArray = array.filter(item => item.id != 1);
```

<!-- prettier-ignore -->
***

## Immutable changes

```js
// array remove index (start, deleteCount)
const array = [1, 2, 3, 4];
const newArray = [...arr.slice(0, start), ...arr.slice(start + deleteCount)];

// array change entry
const newArray = array.map(item => {
  if (item.id === 2) {
    return { ...item, name: Peter };
  }
  return item;
});

// array sort
const newArray = [...arr].sort(compareFunction);
```

---

# Resources & Training

- [Wes Bos ES6 training](https://es6.io/)
- [You-Dont-Know-JS Book series](https://github.com/getify/You-Dont-Know-JS)
- [Frontendmasters - Kyle Simpson](https://frontendmasters.com/courses/)
- [JavaScript Weekly](http://javascriptweekly.com/)
- [TOP 10 JAVASCRIPT TRAPS FOR A C# DEVELOPER](http://prasadhonrao.com/top-10-javascript-traps-for-a-csharp-developer/)
