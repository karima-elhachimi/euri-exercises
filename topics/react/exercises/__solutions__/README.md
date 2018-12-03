# Exercises With Solutions

## Exercise 1 - functions

Write the following code with an arrow function

```js
const filteredCustomers = customers.find(customer, customerFilter)
function customerFilter(customer) {
    if (customer.active) {
        return true;
    } else {
        return false;
    }
}








// Solution
const filteredCustomers = customers.find(customer => customer.active);
```

Use array functions to simplify the following code. Use arrow function where possible.

```js
const data = [
  { id: 1, active: true, lastName: 'Cosemans', firstName: 'Peter' },
  { id: 2, active: false, lastName: 'Jansens', firstName: 'John' },
];
const users = [];
if (data.length > 0) {
  for (let i = 0; i < data.length; i++) {
    console.log(i);
    if (data[i].active) {
      const user = {
        id: data[i].id,
        name: data[i].firstName + ' ' + data[i].lastName,
      };
      users.push(user);
    }
  }
}








// Solution
const data = [
  { id: 1, active: true, lastName: 'Cosemans', firstName: 'Peter' },
  { id: 2, active: false, lastName: 'Jansens', firstName: 'John' },
];
const users = data
    .filter(item => item.active)
    .map(({ id, firstName, lastName }) => ({
        id,
        name: `${firstName} ${lastName}`,
    })
```

## Exercise 2 - This

```js
window.fullname = 'John Doe'
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
console.log(test())  // ouput: 'John Doe'
```

Make the console.log(...) prints 'Aurelio De Rosa'.<br>
Don't change the obj! Find multiple solutions

```







// solution
console.log(obj.prop.getFullname())  // output 'Aurelio De Rosa'
console.log(test.call(obj.prop))     // output 'Aurelio De Rosa'
const test = obj.prop.getFullname.bind(obj.prop)
test()                               // output 'Aurelio De Rosa'
```

## Exercise 3 - Functional programming

Write a function that takes an argument and returns that argument.

```js
identify(3)  // 3










// solution
function identity(x) {
    return x;
}

// or solution
var identity = function(x) {
    return x;
}
```

Write a function (identityf) that takes an argument and return a function that returns that argument

```js
const idf = identityf(3);
idf();  // 3








// solution
function identityf(arg) {
    return function() {
        return arg;
    }
}
```

Write a function (addf) that adds from two invocations:

```js
addf(3)(4)  // 7









// solution
function addf(x) {
    return function(y) {
        return x + 7;
    }
}
```

Write a function (applyf) that takes a function (like add or mul), and makes it callable with two invocations.

```js
function add(x, y) { return x + y }
function mul(x, y) { return x * y }

const addf = applyf(add);
addf(3)(4)           // 7
applyf(mul)(5)(6)    // 30








// solution
function applyf(fn) {
    return function(x) {
        return function(y) {
            return fn(x, y);
        }
    }
}
```

Write a function (curry) that takes a function and an argument, and returns a function that can supply a second argument.

```js
const add3 = curry(add, 3);
add3(4)             // 7
curry(mul, 5)(6)    // 30









// solution
function curry(fn, x) {
    return function(y) {
        return fn(x, y);
    }
}
```

## Exercise 4 - Immutability

Write a pure function to change the name of the customer

```js
let customer = { id: 1, name: 'euricom', location: 'Mechelen'};

customer = updateCustomerName(customer, 'Euricom nv.');
console.log(customer)









// solution
function updateCustomerName(customer, newName) {
    return {
        ...customer,
        name: newName
    }
}
```

Write a pure function to add a customer. Optional create a new sequencial id.

```js
let customers = [
    { id: 1, name: 'euricom'},
    { id: 2, name: 'alasca'}
];

const newCustomer = { name: 'consonto'};
customers = addCustomer(customers, newCustomer);
console.log(customers)







// solution
function addCustomer(customers, newCustomer) {
    return [
        ...customers,
        {
            ...newCustomer,
            id: customers.reduce((acc, item) => Math.max(acc, item.id), 0) + 1
        }
    ]
}
```

Write a pure function to change the name of 'euricom'. Tip: You need to create an new array and modify (immutable) the customer that changes.

```js
let customers = [
    { id: 1, name: 'euricom'},
    { id: 2, name: 'alasca'}
];

customer = updateCustomerName(customers, 1, 'Euricom nv.');
console.log(customers)







// solution
function updateCustomerName(customers, id, name) {
    return customers.map(customer => {
        if (customer.id !== id) {
            return customer;
        }
        return {
            ...customer,
            name
        }
    })
}
```

## Exercise 5 - User List (JSX)

See 'react-alert'

## Exercise 6 - Toggle Text (Component State & Event)

See 'react-alert'

## Exercise 7 - Alert Component (Props)

See 'react-alert'

## Exercise 8 - Shop Product List

See 'react-shop-products'

## Exercise 9 - Shop ErrorBoundery

See 'react-shop-products'

## Exercise 10 - Render Props

- Write a counter logic components. Every time you click on it the counter increments. The couter state is passed as a render prop.

```jsx
const App = () => (
  <Counter>
    {state => (
      <div>
        <h1>The count is: {state.count}</h1>
      </div>
    )}
  </Counter>
);


// solution
class Counter extends Component {
    state: {
        couter: 0
    }

    increment = () => {
        this.setState(prevState => {
            return {
                count: prevState.count + 1,
            };
        });
    };

    render() {
        return (
            <div onClick={this.increment}>
                {this.props.children(this.state)}
            </div>
        );
    }
}
```

## Exercise 11 - Product List with Mobx

- See 'react-shop-basket-mobx'

## Exercise 12 - Shop Basket

- See 'react-shop-basket-mobx'



