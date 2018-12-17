# Exercise Javascript

## Closure - Exercise

What is the output of the following function?

```javascript
    for (var i = 0; i <= 5; i++) {
        setTimeout(function() {
            console.log('i: ' + i);
        }, i * 1000);
    }
```

----

## Module Systems

> Build a calculator module and use it the browser

- Use index.html, main.js & calc.js
- Isolate the calculator with an iffe
- HTML Tips

```html
    <input type="text" id="val1">
    <input type="text" id="val2">
    <button id="myBtn">Add</button>
```

```
    // response to button click
    document.getElementById("myBtn").addEventListener("click", function() {
        const val1 = document.getElementById('val1').value;
        const val2 = document.getElementById('val2').value;
        const result = calc.sum(val1, val2);
        console.log(result);
    }
});
```

> Refactor the calculator and use it in nodeJS

- Use commonJS for the calculator module
- Access the calculator via command line

> Use 3th party library for parsing the command line arguments

- Add 'Yargs' module as command line argument parser

> Refactor calculator in UMD module format and use calc in browser and nodeJS

----

# This

```js
global.fullname = 'John Doe'
const obj = {
   fullname: 'Colin Ihrig',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname
      }
   }
}
const test = obj.prop.getFullname
console.log(test())
```

Make the console.log() prints 'Aurelio De Rosa'.<br>
Don't change the obj!

----

## Prototypal inheritance

```js
// create an animal object that implements eat() function.
const animal = ...

// create a rabbit object that prototypal inherits from animal and add a jump() function.
const rabit = ...
```

## Prototype - How can we implement looping with a callback?

```js
myForEach([0, 1, 2], function(value, index) {
    console.log(value, this[index] === value /* should be true */)
})

function myForEach(arr, callback) {
    // implement me
}

// make it work with
[0, 1, 2].myForEach(function(value) {
    console.log(value)
})
```

---

## Array/Object

Find an item in the array

```js
const ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]

// Find item with name 'john'
```

Transform the array

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Create a list of user names
```

Reduce the array to a single value

```js
const users = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]

// Calculate total age of all users
```

---

## Immutability

Mutate the following object

```js
import deepfreeze from 'deep-freeze';

let obj = { name: 'peter', age: 25 };
deepfreeze(obj);

// Set the age to 52
```

Add an element to the array

```js
const ar = [ 12, 33, 999 ]
deepfreeze(ar);

// Add the number 1000 to the array
```

Remove an element from the array

```js
let ar = [ { name: 'jane' }, { name: 'john'}, { name: 'ike'} ]
deepfreeze(ar);

// Remove john from the array
```

Update an element in the array

```js
let ar = [
    { name: 'jane', age: 12 },
    { name: 'john', age: 22 },
    { name: 'ike', age: 1}
]
deepfreeze(ar);

// Set the age of ike to 20
```

Take a part of an array

```js
const ar = [ 1, 5, 6, 1000 ]
deepfreeze(ar)

// Take the second & third element
```

---

## ES6 Katas

See [http://es6katas.org/](http://es6katas.org/)
Do the following exercises:

- Promise
    + Basics
    + Creation
- Array
    + [].find()
    + [].entries()
    + [].keys()
- Destructuring
    + Array
    + Object
- Object literal
- Rest operator
- Spread operator


