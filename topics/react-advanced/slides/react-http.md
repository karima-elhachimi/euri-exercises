---
title: React HTTP
verticalSeparator: ---//
---

# React HTTP

<img src="./images/http.png" width="300px"/><br>

<small>
Copyright (c) 2018-2019 Euricom nv.
</small>

---

## Introduction

As React does not have a build-in service/library for doing rest based http class we have to rely on 3th party libraries.

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) (standardized, rising)
- [Axios](https://github.com/axios/axios) (popular)
- [SuperAgent](https://visionmedia.github.io/superagent/)

> We'll zoom in on axios as it provides the best out-of-the-box experience

---

## Axios

> Your friend when using REST

```bash
# Install
npm i --save axios
```

---//

### Basics

```js
import axios from 'axios';

axios
  .get('http://localhost:3000/users')
  .then(res => {
    console.log('result', res.data);
  })
  .catch(error => {
    if (error.response) {
      // The request was made and status code >= 400
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request
      console.log('Error', error.message);
    }
  });
```

---//

#### Post

<!-- prettier-ignore -->
```js
import axios from 'axios';

const kentBrockman = {
  isFamily: false,
  gender: 'M',
  lastName: 'Brockman',
  firstName: 'Kent'
};

axios
  .post('http://localhost:3000/users', kentBrockman)
  .then(res => {
    console.log(res.data);
  });
```

---//

#### Delete

<!-- prettier-ignore -->
```js
import axios from 'axios';

// Should be a function parameter ;)
const id = 6;

axios
  .delete(`http://localhost:3000/users/${id}`)
  .then(res => {
    console.log('result', res.data);
  });
```

---//

#### Keep it dry ;)

Create a custom config

```js
// api/user-api-client.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000
});

export default api;
```

... and use it

```js
// api/user.js
import api from './user-api-client';

export function getUsers() {
  return api.get('users');
}
```

---//

#### Axios Interceptors

```js
// api/user-api-client.js

// Add a request log interceptor
api.interceptors.request.use(config => {
  console.log(config.method.toUpperCase(), config.url);
  return config;
});

// Add error log interceptor
api.interceptors.response.use(
  response => response,
  error => {
    console.log('Error', error);
    return Promise.reject(error);
  }
);
```

---//

#### Resources

- [Axios Cheat Sheet](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)

---

### Use it in React

#### In a class component

```js
import React, { Component } from 'react';
import userApi from './api/users';

class MyComponent extends Component {
  state = {
    users: undefined
  };

  async componentDidMount() {
    const users = await userApi.getUsers();

    this.setState({
      users
    });
  }

  render() {
    const { users } = this.state;

    return <div>{users && users.length} users</div>;
  }
}

export default MyComponent;
```

---//

#### In a functional component

```js
import React, { useState, useEffect } from 'react';
import userApi from './api/users';

function MyComponent() {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    async function fetchUsers() {
      const retrievedUsers = await userApi.getUsers();
      setUsers(retrievedUsers);
    }

    fetchUsers();
  }, []);

  return <div>{users && users.length} users</div>;
}

export default MyComponent;
```

<!-- .element: class="fragment" data-fragment-index="1" -->

---

### How to test code using axios?

- A manual mock ([jest-mock-axios](https://www.npmjs.com/package/jest-mock-axios))
- [nock](https://www.npmjs.com/package/nock)
- [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter)

---//

#### jest-mock-axios

```bash
npm i --save-dev jest-mock-axios
```

Create the manual mock

```js
// src/__mocks__/axios.js
import mockAxios from 'jest-mock-axios';

export default mockAxios;
```

---//

#### jest-mock-axios

```js
// api/users.spec.js
import mockAxios from 'jest-mock-axios';
import userApi from './users';

describe('users api', () => {
  afterEach(() => mockAxios.reset()); // Reset the mock

  describe('getUsers', () => {
    test('it returns the res.data', async () => {
      const pattyBouvier = {
        lastName: 'Bouvier',
        firstName: 'Patty',
        id: 6
      };

      const promise = userApi.getUsers();

      mockAxios.mockResponse({
        data: [pattyBouvier]
      });

      const result = await promise;

      expect(mockAxios.get).toHaveBeenCalledWith('users');
      expect(result).toEqual([pattyBouvier]);
    });
  });
});
```

---//

#### jest-mock-axios

- odd api
- seems overly complicated
- will get complex fast with multiple api calls

---//

#### nock

```bash
npm i --save-dev nock
```

```js
import nock from 'nock';
import userApi from './users';

describe('users api', () => {
  describe('getUsers', () => {
    test('it returns the res.data', async () => {
      const pattyBouvier = {
        lastName: 'Bouvier',
        firstName: 'Patty',
        id: 6
      };

      nock('http://localhost:3000')
        .get('/users')
        .reply(200, [pattyBouvier]);

      const result = await userApi.getUsers();

      expect(result).toEqual([pattyBouvier]);
    });
  });
});
```

---//

#### nock

- it is library agnostic
- you can provide expected response before invoking code

---//

#### axios-mock-adapter

```bash
npm i --save-dev axios-mock-adapter
```

```js
// ./api/users.spec.js
import MockAdapter from 'axios-mock-adapter';

import api from './user-api-client';
import userApi from './users';

describe('users api', () => {
  /** @type {MockAdapter} */
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(api);
  });

  afterEach(() => mock.reset());
});
```

---//

#### axios-mock-adapter

```js
describe('getUsers', () => {
  test('it returns the res.data', async () => {
    const pattyBouvier = {
      lastName: 'Bouvier',
      firstName: 'Patty',
      id: 6
    };

    mock.onGet('http://localhost:3000/users').reply(200, [pattyBouvier]);

    const result = await userApi.getUsers();

    expect(result).toEqual([pattyBouvier]);
  });
});
```

---//

#### axios-mock-adapter

- by default all api request respond with 404
- full axios support

---

### Exercises

#### Rules

- write the functions in a tdd fashion, so write tests first
- use nock or axios-mock-adapter
- make the code/tests as clean as possible

---//

#### 1. getById

```curl
GET http://localhost:3000/users/:id
```

Map to following shape

```js
/**
 * @typedef {Object} StoredUser
 * @property {number} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {Date} [birthDate]
 * @property {'M'|'F'} gender
 * @property {Boolean} isFamily
 */
```

---//

#### 2. listPaged

```curl
GET http://localhost:3000/users
```

```js
function listPaged(page, limit = 10) {
  return {
    total: 0,
    data: []
  };
}
```

- sort the data on lastName,firstName
- the response header X-Total-Count contains the total of items
- data is in the same shape as exercise 1

---//

#### 3. save

```curl
POST http://localhost:3000/users
PUT http://localhost:3000/users/:id
```

```js
function save(user) {}
```

- if the user has an id use a PUT request, otherwise use POST
- return the stored user
