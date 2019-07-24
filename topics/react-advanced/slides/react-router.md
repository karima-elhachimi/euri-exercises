---
title: React Router
verticalSeparator: ---//
---

## React Router

<img src="./images/router.png" width="200px"/><br>

> Declarative routing for React

<small>
Copyright (c) 2018-2019 Euricom nv.
</small>

---

### Getting Started

```bash
npm i --save react-router react-router-dom
```

```jsx
// ./app.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Home = () => <h1>Home</h1>;

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
```

---//

#### Route - render methods

There are 3 ways to render something with a route:

```jsx
// As a component prop (⚠️ inlining)
<Route path="/" component={Home} />

// As a render prop
<Route path="/" render={Home} />

// As children
<Route path="/"><Home /></Route>
```

> Both component and render will only be called when the route matches, children will in any case!

---//

#### Route - props

All 3 methods will passed the same 3 route props

- [match](https://reacttraining.com/react-router/web/api/match)
- [location](https://reacttraining.com/react-router/web/api/location)
- [history](https://reacttraining.com/react-router/web/api/history)

```js
const Home = ({ ...props }) => console.log(props) || <h1>Home</h1>;
```

---//

#### Route - path

Any valid URL path or array of paths that [path-to-regexp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0) understands.

```jsx
const ProductDetail = ({ id }) => <h1>Detail {id}</h1>;

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route
        path="/product/:id([0-9]+)"
        render={({ match }) => <ProductDetail id={match.params.id} />}
      />
    </Router>
  );
}

export default App;
```

---//

#### Route - exact

> Oops both routes matched when navigating to /product/11 💩

🛠️ Add the **exact** modifier

```jsx
<Route path="/" exact component={Home} />
```

---//

#### Route - nesting

```jsx
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const Home = ({ ...props }) => console.log(props) || <h1>Home</h1>;
const Product = () => <h1>List</h1>;
const ProductDetail = ({ id }) => <h1>Detail {id}</h1>;

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route
        path="/product"
        render={({ match: { url } }) => (
          <>
            <Route path={`${url}/`} component={Product} exact />
            <Route
              path={`${url}/:id([0-9]+)`}
              render={({ match }) => <ProductDetail id={match.params.id} />}
            />
          </>
        )}
      />
    </Router>
  );
}

export default App;
```

---

### Switch

> Renders the first Route (or redirect) that matches that location

👁️ **Switch** is unique in that it renders a route exclusively. In contrast, every **Route** that matches the location renders inclusively.

---//

#### Switch

```jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = ({ ...props }) => console.log(props) || <h1>Home</h1>;

const Product = () => <h1>List</h1>;
const ProductDetail = ({ id }) => <h1>Detail {id}</h1>;
const NotFound = () => <h1>NotFound</h1>;

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/product" exact component={Product} />
        <Route
          path="/product/:id([0-9]+)"
          render={({ match }) => <ProductDetail id={match.params.id} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
```

---

### withRouter

---

### Navigating

#### Link

#### Programmatically

---

### Prompt

---

### Redirect

---

### React Testing Library?

```bash
npm i --save-dev history
```

```jsx
// ./src/test/react-testing-helpers
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

export function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route]
    })
  } = {}
) {
  return {
    ...render(ui, {
      wrapper: props => <Router {...props} history={history} />
    }),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history
  };
}
```

---

### Resources

> See https://reacttraining.com/react-router/web/guides/quick-start

---

### Exercises
