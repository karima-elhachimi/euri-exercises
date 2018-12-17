# Javascript Promises

<small>by Peter Cosemans</small>

---

## Callback usage

```js
function getCustomer(id, callback) {
    try {
        const result = doSomeAction();
        callback(null, result);
    }
    catch(err) {
        callback(err);
    }
}

// use the function with callback
getCustomer(123, function(err, result) {
    if (err) {
        console.log('ERROR', err);
    }
    console.log(result);
})
```

----

## Basic Promise Usage

```js
const promise = new Promise(function(resolve, reject) {

    // Do an async task async task and then...

    if(/* good condition */) {
        resolve('Success!');
    }
    else {
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

**then**

All promise instances get a then method which allows you to react to the promise.  The first then method callback receives the result given to it by the resolve() call.

**catch**

The catch callback is executed when the promise is rejected.

----

## Timer based promise

```js
function setTimeoutP(timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            if (timeout < 0) {
                reject(new Error('bad timeout value'))
                return;
            }
            resolve('done');
        }, timeout);
    });
}

// use
setTimeoutP(1000).then(() => {
    console.log('it is done');
})

setTimeoutP(-1)
    .then(() => {
        // ...
    })
    .catch((err) => {
        console.log('Error', err);
    })
```

---

# Chaining promises

```js
setTimeoutP(1000)
    .then(() => {
        console.log('first');
        return setTimeoutP(2000);
    })
    .then(() => {
        console.log('second');
        return 'happy';       // by returning a value
                              // its wrapped in a new promise
    })
    .then((result) => {
        console.log(result);  // output: happy
    })
```

Promises can be passed over functions

```js
function action(timeout) {
    // return the promise for continues handling
    return setTimeoutP(timeout)
        .then(() => {
            console.log('first');
            return setTimeoutP(timeout * 2);
        })
        .then(() => {
            console.log('second');
            return 'happy';
        })
}

action.then(result => console.log(result)); // output: happy
```

----

# Direct resolved/rejected promise

```js
// resolved promise
const promise = Promise.resolve('hello');

// rejected promise
const promise = Promise.reject(new Error('bad bad'));
```

```js
function asyncAction(arg) {
    if (!arg) {
        return Promise.reject('bad bad');
    }
    return getCustomer();  // get customer returns an promise
}
```

---

# Combine promises
> One by one, all or just the first one

----

## Promise.all

```js
Promise.all([promise1, promise2]).then(function(results) {
    // Both promises resolved
    // Promise.all waits until both are finished
    const resultPromise1 = results[0];
    const resultPromise2 = results[0];
})
.catch(function(error) {
    // One or more promises was rejected
});
```

----

## Promise.race

```js
Promise.race([promise1, promise2]).then(function(resultFirstPromise) {
    // Only the first promise resolves,
    // the result of the second promise is lost
})
.catch(function(error) {
    // One or more promises was rejected
});
```

