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

🤔 Which different ways to manage state you know?

---//

#### Local (aka component) state

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

  // The actual rendering is done in another component
  return <UserList users={users} />;
}

export default UserContainer;
```

---//

#### Contextual State

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
