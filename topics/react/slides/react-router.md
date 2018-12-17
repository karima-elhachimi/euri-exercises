---
title: React Router
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# React Router

<img src="./images/react-router.jpeg" width="600px" /><br>

<small>
by Peter Cosemans<br>
Copyright (c) 2018 Euricom nv.
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
.reveal tr {
    font-size: 60%;
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

# React Router

> Views, views, views

<!-- prettier-ignore -->
***

## Setup & docs

Install

```bash
# install DOM version
yarn add react-router-dom
```

Resources:

- [react-router](https://github.com/ReactTraining/react-router)
- [React Router Guidelines](https://reacttraining.com/react-router/web/guides/philosophy)

<!-- prettier-ignore -->
***

## Basic routing

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => <h1>Home</h1>;
const About = () => <h1>About</h1>;

export default () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </div>
  </Router>
);
```

<!-- prettier-ignore -->
***

## 404 routing

Use Switch to only render the first match.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const NotFound = () => <h1>Not Found</h1>;

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);
```

<!-- prettier-ignore -->
***

## Link

Add menu

```html
<ul>
    <li><Link to="/"></Link></li>
    <li><Link to="/about"></Link></li>
</ul>
```

<!-- prettier-ignore -->
***

## Access parameters

```html
<Route path="/user/:id" component={Home} />
```

```js
const Home = props => {
  console.log(props.match);
  console.log(props.history);
  console.log(props.location);
  return {
      <h1>User: {props.match.params.id}</h1>
  }
};
```

<!-- prettier-ignore -->
***

## Redirect

Use render prop & Redirect component

```html
<Route path="/protected" render={(props) => {
    if (!isAuthenticated()) {
        return <Redirect to="/login" />
    }
    return <MyProtectedComponent {...props}/>
}} />
```

<!-- prettier-ignore -->
***

## Programmatically navigate

Use HOC 'withRouter' to have access to 'history'

```jsx
import { withRouter } from 'react-router-dom';

const MyComponent = withRouter(({history}) => {
  return (
    <div>
      <h1>MyComponent</h1>
      <button onClick={() => history.push('/')}
    </div>
  );
});
```

---

# Resources

- [React Router Playlist](https://www.youtube.com/watch?v=ojYbcon588A&list=PLqrUy7kON1mfJ1cQfJJ1FiULLNngvlFTD)
