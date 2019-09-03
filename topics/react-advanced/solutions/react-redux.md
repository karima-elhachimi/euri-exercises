#### Todo

```js
// src/js/store/actionTypes.js
export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
```

```js
// src/js/store/actions/todoActions.js
import { ADD_TODO, COMPLETE_TODO } from '../actionTypes';

/**
 * @typedef {object} Todo
 * @property {number} id
 * @property {string} title
 * @property {bool} [completed]
 */

export function addTodo(/** @type {Todo} */ todo) {
  return {
    type: ADD_TODO,
    payload: todo
  };
}

export function completeTodo(id) {
  return {
    type: COMPLETE_TODO,
    payload: id
  };
}
```

```js
// src/js/store/reducers/todoReducer.js
import { ADD_TODO, COMPLETE_TODO } from '../actionTypes';

export default function todoReducer(state = {}, action) {
  switch (action && action.type) {
    case ADD_TODO: {
      const { payload: todo } = action;

      const newState = {
        ...state,
        [todo.id]: todo
      };

      return newState;
    }
    case COMPLETE_TODO: {
      const { payload: id } = action;

      const existingTodo = state[id];
      if (!existingTodo) return state;

      return {
        ...state,
        [id]: {
          ...existingTodo,
          completed: true
        }
      };
    }
    default:
      return state;
  }
}
```

```js
// src/js/store/reducers/todoReducers.spec.js
import todoReducer from './todoReducer';
import { addTodo, completeTodo } from '../actions/todoActions';

describe('todoReducer', () => {
  describe('initialState', () => {
    it('it is an empty object by default', () => {
      const newState = todoReducer();

      expect(newState).toBeObject();
      expect(newState).toEqual({});
    });
  });

  describe('addTodo', () => {
    it('ensure it augments the state', () => {
      const newTodo = { id: 2, title: 'Complete this exercise' };
      const initialState = {
        1: {
          id: 1,
          title: 'You should keep me'
        }
      };

      const newState = todoReducer(initialState, addTodo(newTodo));

      expect(newState).toHaveProperty('1');
      expect(newState[1]).toBe(initialState[1]);
    });

    it('it reduces the todo under a map keyed by its id', () => {
      const newTodo = { id: 2, title: 'Complete this exercise' };

      const newState = todoReducer(undefined, addTodo(newTodo));

      expect(newState).toHaveProperty('2', newTodo);
    });
  });

  describe('completeTodo', () => {
    it('it sets the completed of the todo identified by the id to true', () => {
      const initialState = {
        1: {
          id: 1,
          title: 'You should keep me'
        },
        2: {
          id: 2,
          title: 'Complete this exercise'
        }
      };

      const newState = todoReducer(initialState, completeTodo(2));

      // Ensure we keep the others
      expect(newState).toHaveProperty('1');
      expect(newState[1]).toBe(initialState[1]);
      expect(newState[1]).toEqual(initialState[1]);

      // Verify completed
      expect(newState).toHaveProperty('2', {
        ...initialState[2],
        completed: true
      });
    });
  });
});
```

```js
// src/js/store/todoApp.js
import { combineReducers, createStore } from 'redux';
import todoReducer from './reducers/todoReducer';
import { addTodo, completeTodo } from './actions/todoActions';

const reducer = combineReducers({
  todos: todoReducer
});

const store = createStore(reducer);

// Log the initial state
console.log(store.getState());

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some actions
store.dispatch(addTodo({ id: 1, title: 'Wash dishes' }));
store.dispatch(addTodo({ id: 2, title: 'Iron clothes' }));

store.dispatch(completeTodo(1));

// Stop listening to state updates
unsubscribe();
```
