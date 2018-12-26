---
title: Javascript Async
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

## Javascript Async

<img src="./images/async.png" width="400px" /><br>
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

# Async

> Handle it in the future.

---

## Callback function

```js
function getCustomer(id, callback) {
  try {
    const result = doSomeAction();
    callback(null, result);
  } catch (err) {
    callback(err);
  }
}
```

use

```js
getCustomer(123, function(err, result) {
  if (err) {
    console.log("ERROR", err);
  }
  console.log(result);
});
```

---

# Promises

> Promise that you will handle this

<!-- prettier-ignore -->
***

## Basic Promise Usage

```js
const promise = new Promise(function(resolve, reject) {
    // Do an async task async task and then...
    if(/* good condition */) {
        resolve('Success!');
    } else {
        reject('Failure!');
    }
});

// use the promise
promise
    .then((result) => {
        console.log(result);  // output: 'Success!'
    })
    .catch((error) => {
        /* error == 'Failure!' */
    })
```

<!-- prettier-ignore -->
***

## Basic Promise Usage

> then

All promise instances get a then method which allows you to react to the promise. The first then method callback receives the result given to it by the resolve() call.

> catch

The catch callback is executed when the promise is rejected.

<!-- prettier-ignore -->
***

## Timer based promise

```js
function setTimeoutP(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (timeout < 0) {
        reject(new Error("bad timeout value"));
        return;
      }
      resolve("done");
    }, timeout);
  });
}
```

<!-- prettier-ignore -->
***

### use of the timer

```js
// use
setTimeoutP(1000).then(() => {
  console.log("it is done");
});

setTimeoutP(-1)
  .then(() => {
    // ...
  })
  .catch(err => {
    console.log("Error", err);
  });
```

<!-- prettier-ignore -->
***

## Use a promise api

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

<!-- prettier-ignore -->
***

## Chaining promises

```js
setTimeoutP(1000)
  .then(() => {
    console.log("first");
    return setTimeoutP(2000);
  })
  .then(() => {
    console.log("second");
    return "happy"; // by returning a value
    // its wrapped in a new promise
  })
  .then(result => {
    console.log(result); // output: happy
  });
```

<!-- prettier-ignore -->
***

### Chaining promises

Promises can be passed over functions

```js
function action(timeout) {
  // return the promise for continues handling
  return setTimeoutP(timeout)
    .then(() => {
      console.log("first");
      return setTimeoutP(timeout * 2);
    })
    .then(() => {
      console.log("second");
      return "happy";
    });
}

action.then(result => console.log(result)); // output: happy
```

<!-- prettier-ignore -->
***

## Direct resolved/rejected

```js
// resolved promise
const promise = Promise.resolve("hello");

// rejected promise
const promise = Promise.reject(new Error("bad bad"));
```

```js
function asyncAction(arg) {
  if (!arg) {
    return Promise.reject("bad bad");
  }
  return getCustomer(); // get customer returns an promise
}
```

<!-- prettier-ignore -->
***

## Combine promises

### Promise.all

Wait for all promises to complete

```js
Promise.all([promise1, promise2])
  .then(function(results) {
    // Both promises resolved
    // Promise.all waits until both are finished
    const resultPromise1 = results[0];
    const resultPromise2 = results[0];
  })
  .catch(function(error) {
    // One or more promises was rejected
  });
```

<!-- prettier-ignore -->
***

### Promise.race

```js
Promise.race([promise1, promise2])
  .then(function(resultFirstPromise) {
    // Only the first promise resolves,
    // the result of the second promise is lost
  })
  .catch(function(error) {
    // One or more promises was rejected
  });
```

---

# Async/await

> Async but in a sync way

<!-- prettier-ignore -->
***

### from Promise to Async/await

```js
function getCustomers() {
  return http
    .get("/api/customers")
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
    const result = await http.get("/api/customers");
    return result.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```

<!-- prettier-ignore -->
***

## Combining async calls

Chaining multiple calls

```js
async function getCustomerFromOrder(orderId) {
  const resOrder = await http.get(`/api/orders/${orderId}`);
  const resCustomer = await http.get(`/api/customer/${resOrder.data.customerId}`);
  return resCustomer.data;
}
```

Wait for multiple

```js
async function getCustomerById(cust1, cust2, cust3) {
  const result = await Promise.All(
    http.get(`/api/customer/${cust1}`),
    http.get(`/api/customer/${cust2}`),
    http.get(`/api/customer/${cust3}`)
  );
  return result.map(res => res.data);
}
```

<!-- prettier-ignore -->
***

## Generators

```js
async function getCustomers() {
  try {
    const result = await http.get("/api/customers");
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
    const result = yield http.get("/api/customers");
    return result.data;
  } catch (error) {
    console.log(err);
    return [];
  }
}
```
