---
title: React Http
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

# React

## Introduction

<img src="./images/http.png" width="300px"/><br>

<small>
Copyright (c) 2018-2019 Euricom nv.
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

# Http Requests

> Get the data

<!-- prettier-ignore -->
***

## Http in React

> React doens't provide a Http library.

#### 3th party libraries

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) (standardized)
- [Axios](https://github.com/axios/axios) (most popular)
- [SuperAgent](https://visionmedia.github.io/superagent/)
- [Request](https://github.com/request/request)

---

# Axios

> Your friend when using REST

<!-- prettier-ignore -->
***

```js
import axios from "axios";

axios
  .get("https://swapi.co/api/starships")
  .then(res => {
    // success
    console.log("result", res.data);
  })
  .catch(error => {
    if (error.response) {
      // The request was made and status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else {
      // Something happened in setting up the request
      console.log("Error", error.message);
    }
  });
```

<!-- prettier-ignore -->
***

## Axios

post

```js
const todo = {
  userId: 1,
  title: "write some code",
  completed: false
};
const url = "http://jsonplaceholder.typicode.com/todos";
axios.post(url, todo).then(res => {
  console.log("result", res.data);
});
```

delete

```js
const url = `http://jsonplaceholder.typicode.com/todos/${id}`;
axios.delete(url).then(res => {
  console.log("result", res.data);
});
```

<!-- prettier-ignore -->
***

## Axios

custom config

```js
// api.js
import axios from "axios";
export default axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});
```

use

```js
// api/contact.js
import api from "./api";

export default {
  async getById(id) {
    const res = await api.get(`contacts/${id}`);
    return res.data;
  }
};
```

<!-- prettier-ignore -->
***

## Axios in React

```jsx
import contactApi from "./api/contacts";

export default class MyComponent extends Component {
  state = {
    contact: {}
  };
  async componentDidMount() {
    const contact = await contactApi.getById(1);
    setState({
      contact
    });
  }
  render() {
    const { contact } = this.state;
    return (
      <div>
        <h1>Contact</h1>
        <Contact contact={contact} />;
      </div>
    );
  }
}
```

<!-- prettier-ignore -->
***

## Axios instance

```js
// Create axios instance
const instance = axios.create({
  timeout: 5000,
  baseURL: "https://euri-test-api.now.sh/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${USER_TOKEN}`
  }
});
```

<!-- prettier-ignore -->
***

## Axios Interceptors

```js
// Add a request log interceptor
instance.interceptors.request.use(config => {
  console.log(config.method.toUpperCase(), config.url);
  return config;
});
```

```js
// Add error log interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    console.log("Error", error);
    return Promise.reject(error);
  }
);
```

<!-- prettier-ignore -->
***

## Improved Error loggger

```js
// Add error log interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    // https://github.com/axios/axios#handling-errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    return Promise.reject(error);
  }
);
```

<!-- prettier-ignore -->
***

## Axios Error Handling

```js
import eventBus from "pubsub-js";
import { RequestError, NoConnectionError } from "./errors";

// Add error transform interceptor
instance.interceptors.response.use(
  response => response,
  error => {
    if (Object.prototype.hasOwnProperty.call(error.config, "handleError") && error.config.handleError === true) {
      // the error will be handled locally
      return Promise.reject(error);
    }

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      eventBus.publish("error", new RequestError(error.response, error.config.url));
    } else if (error.request) {
      // The request was made but no response was received
      // Typically there is a network error or no internet connection
      // console.log(error.request);
      eventBus.publish("error", new NoConnectionError());
    } else {
      // Something happened in setting up the request that triggered an Error
      eventBus.publish("error", error);
    }
    return Promise.reject(error);
  }
);
```

<!-- prettier-ignore -->
***

## Errors

```js
// errors.js
export class RequestError extends Error {
  constructor(response, url) {
    super(`Bad server response [${response.status}]`);
    Error.captureStackTrace(this, RequestError);
    this.status = response.status;
    this.data = response.data;
    this.headers = response.headers;
    this.url = url;
  }
}

export class NoConnectionError extends Error {
  constructor() {
    super("Connection to the server failed");
    Error.captureStackTrace(this, NoConnectionError);
  }
}
```

---

# Resources

- [Axios Cheat Sheet](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)
