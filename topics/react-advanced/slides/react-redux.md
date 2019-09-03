---
title: React Redux
verticalSeparator: ---//
---

## React Redux

<img src="./images/redux.svg" width="400px"/><br>

<small>
Copyright (c) 2018-2019 Euricom nv.
</small>

---

### React State

<img src="./images/state-ff.jpg" width="400px"/><br>

🤔 Which different ways to manage state do you know?

---//

#### Local (Component) state

```jsx
import React, { useCallback, useState } from 'react';

function Counter() {
  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => {
    setCounter(current => current + 1);
  }, []);

  return (
    <>
      <span>{counter}</span>
      <button type="button" onClick={increment}>
        +
      </button>
    </>
  );
}

export default Counter;
```

---//

#### Container state

```jsx
import React, { useState, useEffect } from 'react';

import * as userApi from '../../api/users';
import UserList from './user-list';

function UserContainer() {
  //👉 State is uplifted to container component
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const userResources = await userApi.listPaged(1, 20);

      setUsers(userResources);
    }

    fetchUsers();
  }, []);

  // The rendering is done in another component
  return <UserList users={users} />;
}

export default UserContainer;
```

---//

#### Contextual (Provided) State

```jsx
import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

function ThemedApp() {
  const [color, setColor] = useState('light');

  return (
    <ThemeContext.Provider value={color}>
      <button type="button" onClick={() => setColor('dark')}>
        Switch to dark
      </button>
      <AppBar />
    </ThemeContext.Provider>
  );
}

function AppBar() {
  const themeColor = useContext(ThemeContext);

  return <span>{themeColor}</span>;
}

export default ThemedApp;
```

---//

#### Global State

🤔What if you wanted to share state across the entire application?

<img src="./images/react-state-redux.png" width="400px"/><br>

<!-- .element: class="fragment" data-fragment-index="1" -->

---

### Redux

<img src="./images/redux-schematics.png" width="600px"/>

---//

#### Redux - Getting Started

```bash
# Install redux
npm i --save redux@3

# Later on you probably want react bindings & developer tools
npm i react-redux
npm i --save-dev redux-devtools-extension
```

---

### [Actions](https://redux.js.org/basics/actions#actions)

Actions are payloads of information that send data from your application to your store (using [`store.dispatch()`](https://redux.js.org/api/store#dispatchaction)).

```js
// 💡Types should typically be defined as string constants.
// Usually stored in a separate module actionTypes.js
const INCREMENT = 'INCREMENT';

// 💡An action is a plain Javascript object
const action = {
  type: INCREMENT // ⚠️ All actions MUST have a type
};
```

---//

#### [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action)

👉 Other than `type`, redux leaves the structure of an action up to you.

- An action MUST be a plain JavaScript object and have a `type` property.
- An action MAY have an `error`, a `meta` and/or a `payload` property
- An action MUST NOT include properties other than type, payload, error, and meta

---//

#### [Action Creators](https://redux.js.org/basics/actions#action-creators)

Action creators are exactly that—functions that create actions.

```js
const ADD_TODO = 'ADD_TODO';

// 💡In Redux, action creators simply return an action
export function addTodo(todo) {
  return {
    type: ADD_TODO,
    payload: todo
  };
}
```

---

### [Reducers](https://redux.js.org/basics/reducers)

Reducers specify how the application's state changes in response to actions sent to the store.

```js
// 💡 A reducer is a pure function
// that takes the previous state and an action,
// and returns the next state.
const reducer = (previousState, action) => newState;
```

<small>
💡Remember that actions only describe what happened, but don't describe how the application's state changes.
<small>

---//

#### [Reducers](https://redux.js.org/basics/reducers)

It's called a reducer because it's the type of function you would pass to [`Array.prototype.reduce(reducer, ?initialValue)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

It's very important that the reducer stays pure, **never**:

- Mutate its arguments
- Perform side effects (API calls and routing transitions)
- Call non-pure functions, e.g. `Date.now()` or `Math.random()`.

---//

#### Reducers - State Shape

In Redux, all the application state is stored as a single object. It's a good idea to think of its shape before writing any code.

```js
// It's common to keep entity state as a id map
// (see https://redux.js.org/basics/reducers#note-on-relationships)
const todoState = {
  1: { id: 1, name: 'Call the doctor' },
  2: { id: 2, name: 'Wash car' }
};
```

🤔 What's the minimal representation of your app's state as an object?

---//

#### Reducers - `switch`

```js
const REVEAL = 'REVEAL';

const initialState = { visible: false };

// 👉 Using ES6 defaults arguments syntax
function visibilityReducer(state = initialState, action) {
  switch (action) {
    case REVEAL:
      return {
        // 💡 We NEVER mutate state
        visible: true
      };
    default:
      // Return the previous state for any unknown action.
      return state;
  }
}
```

---//

#### Reducers - `createReducer`

```js
const REVEAL = 'REVEAL';

const initialState = { visible: false };

const visibilityReducer = createReducer(initialState, {
  [REVEAL]: (state, action) => ({
    visible: true
  })
});
```

```js
// High Order Function
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    const handler = handlers[action.type];

    return handler ? handler(state, action) : state;
  };
}
```

---//

#### Reducers - `combineReducers`

You can combine multiple reducers into 1

```js
import { combineReducers } from 'redux';

function reducer1(state, action) {}
function reducer2(state, action) {}

const myApp = combineReducers({
  stateProperty1: reducer1,
  stateProperty2: reducer2
});
```

```js
// = Roughly (see https://redux.js.org/api/combinereducers)
function myApp(state = {}, action) {
  return {
    stateProperty1: reducer1(state.stateProperty1, action),
    stateProperty2: reducer2(state.stateProperty2, action)
  };
}
```

---

### [Store](https://redux.js.org/basics/store)

The Store is the object that brings [actions](https://redux.js.org/basics/actions) and [reducers](https://redux.js.org/basics/reducers) together and has following responsibilities:

- Holds application state
- Allows access to state via [`getState()`](https://redux.js.org/api/store#getState)
- Allows state to be updated via [`dispatch(action)`](https://redux.js.org/api/store#dispatchaction)
- Registers listeners via [`subscribe(listener)`](https://redux.js.org/api/store#subscribelistener)

👉 It's important to note that you'll only have a single store in a Redux application.

---//

#### [Store](https://redux.js.org/basics/store)

```js
// actionTypes.js
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
```

```js
// counterReducer.js
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actionTypes';

export default function counterReducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT_COUNTER: {
      return state + 1;
    }
    case DECREMENT_COUNTER: {
      return state - 1;
    }
    default:
      return state;
  }
}
```

---//

#### [Store](https://redux.js.org/basics/store)

```js
// store.js
import { combineReducers, createStore } from 'redux';
import counterReducer from './counterReducer';
import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './actionTypes';

const reducer = combineReducers({
  myCounter: counterReducer
});

const store = createStore(reducer);

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch({ type: INCREMENT_COUNTER });
store.dispatch({ type: INCREMENT_COUNTER });
store.dispatch({ type: DECREMENT_COUNTER });
store.dispatch({ type: INCREMENT_COUNTER });

// Stop listening to state updates
unsubscribe();
```

---

### Exercise 1 - Todo's

```js
/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {bool} [completed]
 */
```

- verify that our `todoReducer` has an initialState of `{}`

---//

#### Exercise 1-2 - `addTodo`

```js
// state design
{
  [id]: todo,
}
```

- create an `addTodo` actionCreator with the todo as payload
- verify that our reducer spreads the existing state
- verify that our reducer normalizes the todo under its id

---//

#### Exercise 1-2 - `completeTodo`

- create an `completeTodo` actionCreator with the completed todo his id as payload
- verify that our reducer retains other todo's and does not complete them,
- verify that our reducer sets the completed flag to true for the given todo

