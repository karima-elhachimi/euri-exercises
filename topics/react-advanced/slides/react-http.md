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

Use it

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

---

### Axios Mock Adapter

---HERE
