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

🤔Which different state management patterns we already used?

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
