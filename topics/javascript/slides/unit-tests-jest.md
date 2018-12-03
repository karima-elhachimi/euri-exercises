## Javascript Unit Testing with Jest
<img src="./images/testing.jpeg" width="600px" /><br>
<small>by Peter Cosemans</small>

<br>
<small>
Copyright (c) 2017 Euricom nv.
</small>

---

# What do I need?

> There are so many frameworks & libraries

----

## Setups

* Browser
    * [Karma](https://karma-runner.github.io/1.0/index.html)
        - [Jasmine](https://jasmine.github.io/)
        - [PhantomJS](http://phantomjs.org/)

* Node
    * [Mocha](https://mochajs.org/])
        - [Chai](http://chaijs.com/)
        - [Sinon.JS](http://sinonjs.org/)
    * [Jest]([https://facebook.github.io/jest/])

* Integrated
    * [Angular-CLI](https://github.com/angular/angular-cli)
        - [Karma](https://karma-runner.github.io/1.0/index.html)

* End-to-end
    * [Protractor](http://www.protractortest.org/) (Angular)
    * [testcafe](https://github.com/devexpress/testcafe)
    * [nightwatchjs](http://nightwatchjs.org/)

----

## Libraries

* Assertion Libraries
    - [Jasmine](https://jasmine.github.io/)
    - [Chai](http://chaijs.com/)
    - [Should](http://github.com/visionmedia/should.js)
    - [Expect](https://github.com/mjackson/expect)
    - [Should](https://shouldjs.github.io/)

* HTTP Integration Tests
    - [Chai-http](http://chaijs.com/plugins/chai-http/)
    - [SuperTest](https://github.com/visionmedia/supertest)

* Mocking Libraries
    - [Jasmine](https://jasmine.github.io/)
    - [Jest](https://facebook.github.io/jest/docs/mock-function-api.html#content)
    - [Sinon.JS](http://sinonjs.org/)
    - [testdouble.js](https://github.com/testdouble/testdouble.js)

----

## Libraries

* Specials
    - [JSDom](https://github.com/tmpvar/jsdom)
    - [mocha-jsdom](https://www.npmjs.com/package/mocha-jsdom)
    - [mocha-webpack](https://www.npmjs.com/package/mocha-webpack)
    - [phantomJS](http://phantomjs.org/)

---

# Jest

> Delightful JavaScript Testing

----

## Why Jest

* Build by facebook
* Easy to get started and powerfull to extend
* Instant and user friendly feedback
* It's fast!
* Out of the box support for (no config):
    - Babel (ES6+)
    - JSDom (no browser)
    - Code coverage
    - Promises and async testing
    - Standard Assertion matchers (but doesn't lockout others)
    - Mock by default
* Watch support for
    - All files: *.spec.js, *.test.js
    - Regex Patterns
    - Only changed files (including git file status)
* Can be used in projects that use webpack to manage assets
* Can be used for NodeJS, ReactJS, [Angular](https://www.xfive.co/blog/testing-angular-faster-jest/) & [VueJS](https://hackernoon.com/jest-for-all-episode-1-vue-js-d616bccbe186)

---

# Getting started with Jest

> Easy startup

----

## My First Test

```bash
$ npm init
$ yarn add jest --dev
```

First, create a ```sum.js``` file:

```js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Then, create a file named ```sum.spec.js```

```js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Add the following section to your ```package.json```:

```json
{
    ...
    "scripts": {
        "test": "jest"
    }
}
```

----

## Run

Run

```bash
$ yarn test
```

Output

```bash
 PASS  ./sum.spec.js
  ✓ adds 1 + 2 to equal 3 (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.129s
Ran all test suites.
✨  Done in 1.79s.
```

Help

```bash
$ ./node_modules/jest-cli/bin/jest.js --help
Usage: node_modules/jest-cli/bin/jest.js [--config=<pathToConfigFile>]
[TestPathPattern]

Options:
  --help, -h     Show help  [boolean]
  ...
```

---

# Basic use

> Start writing those unit tests

----

## Auto Watch

Runs test automatically.
Config.

```json
// package.json
{
    ...
    "scripts": {
        "test": "jest --watch"
    }
}
```

Run

```bash
 PASS  ./sum.spec.js
  ✓ adds 1 + 2 to equal 3 (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.105s, estimated 1s
Ran all test suites.

Watch Usage
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

----

## Using Matchers

toBe (===)

```js
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
```

toEqual (checks every property)

```js
test('object assignment', () => {
    const data = {one: 1};
    data['two'] = 2;
    expect(data).toEqual({one: 1, two: 2});
});
```

Truthiness

```js
test('null', () => {
    const n = null;
    expect(n).toBeNull();
    expect(n).toBeDefined();
    expect(n).not.toBeUndefined();
    expect(n).not.toBeTruthy();
    expect(n).toBeFalsy();
});

test('zero', () => {
    const z = 1;
    expect(z).not.toBeNull();
    expect(z).toBeDefined();
    expect(z).not.toBeUndefined();
    expect(z).toBeTruthy();
    expect(z).not.toBeFalsy();
});
```

----

## Using Matchers

Numbers

```js
test('two plus two', () => {
    const value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);

    // toBe and toEqual are equivalent for numbers
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

test('adding floating point numbers', () => {
    const value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});
```

Strings

```js
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
});
```

----

## Using Matchers

Arrays

```js
const shoppingList = [
  'kleenex',
  'trash bags',
  'beer',
];

test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});
```

Exceptions

```js
function fn() {
    throw new Error('bad bad bad');
}

test('compiling android goes as expected', () => {
    expect(fn).toThrow();
    expect(fn).toThrow(ConfigError);

    // You can also use the exact error message or a regexp
    expect(fn).toThrow('you are using the wrong JDK');
    expect(fn).toThrow(/JDK/);

    // warp a function with arguments
    expect(() => testMe(1, 2, 3)).toThrow();
});
```

And More

[https://facebook.github.io/jest/docs/expect.html](https://facebook.github.io/jest/docs/expect.html)

----

## Grouping

```js
describe('myCalculator', () => {
    test('add ...', () => {
        ...
    })
    test('substract ...', () => {
        ...
    })
})
```

Nested grouping

```js
describe('myCalculator', () => {
    describe('add', () => {
        test('2 numbers', () => {
            ...
        })

        test('2 strings', () => {
            ...
        })
    })
    ...
})
```

You can also use the bdd style

```js
describe('myCalculator', () => {
    it('should add ...', () => {
        ...
    })
    it('should substract ...', () => {
        ...
    })
})
```

----

## Setup and teardown

```js
beforeAll(() => {
    // setup at beginning of file
})

beforeEach(() => {
    // setup before each test
})

afterEach(() => {
    // cleanup after each
})

afterAll(() => {
    // file cleanup
});

test('this has ...', () => { ... })
```

Scoped setup/teardown

```js
describe('Calculator', () => {

    beforeEach(() => {
    })

    describe('Sum', () => {

        beforeEach(() => {
        })

        it('should ...', () => {
        })
    })

    it('should ...', () => {
    })
})
```

----

## Config & Helper

Add jest config to your package.json

```json
// package.json
{
    ...
    "jest": {
        "verbose": true,
        "automock": true,
        "testEnvironment": "node",      // default: 'jsdom'
        "setupTestFrameworkScriptFile": "<rootDir>/jestSetup.js"
        ...
    }
}
```

Helper file: ```jestSetup.js```

```js
import 'jasmine-expect';        // add extra jasmine matchers

// mock localStorage & sessionStorage
const mock = () => {
  let storage = {};
  return {
    getItem: key => key in storage ? storage[key] : null,
    setItem: (key, value) => storage[key] = value || '',
    removeItem: key => delete storage[key],
    clear: () => storage = {},
  };
};

Object.defineProperty(window, 'localStorage', {value: mock()});
Object.defineProperty(window, 'sessionStorage', {value: mock()});
```

More [https://facebook.github.io/jest/docs/en/configuration.html#content](https://facebook.github.io/jest/docs/en/configuration.html#content)

----

## Babel

Setup babel

```bash
# install & configure babel
$ yarn add babel-core babel-preset-latest --dev
```

```json
// .babelrc
{
    "presets": ["latest"]
}
```

Create a ES6 ```sum.js``` & test file ```sum.spec.ts```

```js
// sum.js
export function sum(a, b) {
  return a + b;
}
```

```js
// sum.spec.js
import { sum } from './sum'

describe('my first test', () => {
    test('should ...', () => {
        ...
    })
})
```

----

## TypeScript

Setup Typescript

```bash
npm install typescript -g               # global install typescript
npm init                                # create package.json
tsc --init                              # create tsconfig.json

# install dependencies for typescript & jest
yarn add typescript ts-jest @types/jest --dev
```

Config

```json
// package.json
"jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [ "ts", "tsx", "js" ]
}
```

Create the TypeScript ```sum.ts``` & test ```sum.spec.ts```

```js
export function sum(a: number, b: number) : number {
  return a + b;
}
```

```js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

----

## Special tests cases

Pending tests

    it('should return -1 when the value is not present');

Exclusive tests

    describe.only   only this block
    test.only       only run this test
    it.only         only run this test

Inclusive tests

    describe.skip   exclude/ignore this block
    test.skip       exclude/ignore this test
    it.skip         exclude/ignore this test

---

# Async Testing Patterns

> All my Javascript is asynchronous

----

## An async test

```js
// myService.js
export function find(query) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if (!query) {
            reject('bad value')
            return;
        }
        resolve('abc')
    }, 100)
  });
}

```

```js
// myService.spec.js
import { find } from './myService'

test('should fail', () => {
    find(null)
      .then((data) => {
        expect(data).toBe('abc')
      })
});
```
<!-- .element: class="fragment" data-fragment-index="2" -->
This should fail, why doesn't it?
And what is this: 'UnhandledPromiseRejectionWarning'
<!-- .element: class="fragment" data-fragment-index="3" -->

> The test is done before the promise is finished
<!-- .element: class="fragment" data-fragment-index="4" -->

----

## Async test with promise

```js
// myService.spec.js
import { find } from './myService'

describe('test', () => {
    it ('should work', () => {
        // return the promise here
        return find('query')
            .then(data => {
                expect(data).toEqual('abc')
            })
        })
    });
});
```

> Returning the promise let the test wait until the end.

And it works with errors too :)

```js
test('the find fails with an error', () => {
    // Make sure to add expect.assertions to verify that a
    // certain number of assertions are called.
    expect.assertions(1);
    return find(null).catch(e =>
        expect(e).toMatch('bad')
    );
});
```

----

## Async test with resolves / rejects

Available in Jest 20.0.0+

```js
// myService.spec.js
import { find } from './myService'

describe('test', () => {
    it ('should work', () => {
        // Be sure to return the assertion
        return expect(find('query')).resolves.toEqual('abc');
    });
});
```

```js
// myService.spec.js
import { find } from './myService'

describe('test', () => {
    it ('should fail', () => {
        // Be sure to return the assertion
        return expect(find(null)).rejects.toMatch('bad');
    });
});
```

---

# Mocks

> Test the untestable :)

----

## A Use Case

```js
// myRepo.js
import User from 'userModel'
import domainService from 'domainService'
export function updateUser(id, updatedUser) {
    return User.findById(id)
        .then(user => {
            if (domainService.applyCustomer(user) == 'canceled') {
                return true
            }
            return false
        })
}
```

```js
import * as myRepo from './myRepo'
describe('myRepo', () => {
    it('should ...', () => {
        // how to test without the DB ??
        // how to test if applyCustomer is called???
        myRepo.updateUser({ id: 122, 'name': 'peter'});
    })
})

```

----

## Mock Functions

Create a mock function

```js
// create the mock
const myMock = jest.fn();

// you can call the function
myMock('1');

// and verify it was called correctly
expect(myMock).toBeCalled();
expect(myMock).toBeCalledWith('1');
expect(myMock.mock.calls.length).toBeGreaterThan(0);
expect(myMock.mock.calls[0][0]).toBe('1');   // first call, first argument
```

A mock function returning a value

```js
// create the mock function that returns 100
const myMock = jest.fn().mockReturnValue(100)
const myMock2 = jest.fn().mockReturnValueOnce('hello')
                         .mockReturnValueOnce('world')

// you can call the function
const result = myMock();
const result1 = myMock();
const result2 = myMock2();
const result3 = myMock2();

// and verify it was called correctly
expect(myMock).toHaveBeenCalledTimes(2)
expect(result).toBe(100);
expect(result1).toBe(100);
expect(result2).toBe('hello');
expect(result3).toBe('world');
```

----

## Mock Functions
### More examples

With custom implementation

```js
// throw an error
jest.fn().mockImplementation(() => { throw new Error('bad') })
jest.fn(() => { throw new Error('bad') })

// return a resolved promise
jest.fn().mockImplementation(() => Promise.resolve(100)))
jest.fn().mockReturnValue(Promise.resolve(100));
jest.fn(() => Promise.resolve(100)))

// return a rejected promise
jest.fn(() => Promise.reject('bad bad')))

// call a callback
jest.fn(cb => cb(null, true));
```

----

## Verify mock expectations

```js
const myMock = jest.fn();
```

```js
// any
myMock('1');
expect(myMock).toHaveBeenCalled();
expect(myMock).toHaveBeenCalledWith('1');
expect(myMock).toHaveBeenCalledWith(expect.anything());
expect(myMock).toHaveBeenCalledWith(expect.any(String));
```

```js
// string matching
const str = 'The quick brown fox...';
myMock(str);
expect(myMock).toHaveBeenCalledWith(expect.stringContaining('brown'));
expect(myMock).toHaveBeenCalledWith(expect.stringMatching(/^The quick/));
```

```js
// array containing
const a = [1, 2, 3];
myMock(a);
expect(myMock).toHaveBeenCalledWith(expect.arrayContaining([1, 2]));
expect(a).toEqual(expect.arrayContaining([1, 2]))
```

```js
// object containing
const obj = { name: 'john', id: 123 };
myMock(obj);
expect(myMock).toHaveBeenCalledWith(expect.objectContaining({
    name: 'john',
    id: expect.any(Number)
}));
expect(obj).toEqual(expect.objectContaining({ name: 'john' }))
```

----

## Mock Dependency - single function

A sample user repository

```js
// userRepo.js
import { db } from './db'

export class UserRepo {
    findById(id) {
        return db.query({ id }); // this call to the DB
    }
}
```

```js
import { UserRepo } from './userRepo'
import { db } from './db'

test('userRepo', () => {
    // arrange
    const testUser = { id: 12, name: 'John' };
    jest.spyOn(db, 'query').mockReturnValue(Promise.resolve(testUser))
    const sut = new UserRepo();

    // act
    return sut.findById(12)
        .then(user => {
            // assert
            expect(user.id).toBe(12);
            expect(db.query).toHaveBeenCalledWith(12)
        })
})
```

----

## Mock Dependency - import

A sample user repository

```js
// userRepo.js
import { db } from './db'
import { eventBus } from './eventBus'

export class UserRepo {

    // other methods

    save(user) {
        eventBus.publish('save', user)
        return db.save(user); // this call to the DB
    }
}
```

You can mock an import completely

```js
import { UserRepo } from './userRepo'
import { db } from './db'
import { eventBus } from './eventBus'
jest.mock('./userModel');
jest.mock('./eventBus');

test('userRepo', () => {

    // arrange
    const user = { id: 12, name: 'John' };
    db.save.mockReturnValue(Promise.resolve(user))
    const sut = new UserRepo();

    // act
    return sut.save(testUser)
        .then(user => {
            // assert
            expect(db.save).toHaveBeenCalledWith(user)
            expect(eventBus.publish).toHaveBeenCalledWith('save', user)
        })
})
```

----

## SnapShop Testing

```js
export function formatList(listName, items, key) {
  return `These are the items in the ${listName}:${
    items.reduce((itemsList, item) => {
      return `${itemsList}\n  - ${key ? item[key] : item}`
    }, '')
  }`
}
```

```js
import { formatList } from './format-list'

test('can format a list', () => {
  const formattedList = formatList(
    'Star Wars Names',
    [
      {name: 'Qui-Gon Jinn'},
      {name: 'Chewbacca'},
      {name: 'Han Solo'},
      {name: 'Luke Skywalker'},
    ],
    'name'
  )
  expect(formattedList).toMatchSnapshot()
})
```

To update the snapshot

```bash
jest --updateSnapshot
```

> You need to commit all snapshots and keep them in version control

----

## Fake timers

Fake timers is a synchronous implementation of 'setTimeout'.

```js
// replace the global setTimeout, setInterval, nextTick and stop time.
var clock = jest.useFakeTimers();

// The code won't do anything as the timer is not running now.
setTimeout( function() { console.log('One second has elapsed.'); }, 1000 );

// Fast-forward until all timers have been executed
jest.runAllTimers();
jest.runTimersToTime(1000);     // fast-forward specific time

// now the timer function is executed
```

---

## Resources

* https://medium.com/airbnb-engineering/unlocking-test-performance-migrating-from-mocha-to-jest-2796c508ec50
