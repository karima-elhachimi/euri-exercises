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

#### Route - route props

All 3 methods will passed the same 3 route props

- [match](https://reacttraining.com/react-router/web/api/match)
- [location](https://reacttraining.com/react-router/web/api/location)
- [history](https://reacttraining.com/react-router/web/api/history)

```js
const Home = ({ ...props }) => console.log(props) || <h1>Home</h1>;
```
