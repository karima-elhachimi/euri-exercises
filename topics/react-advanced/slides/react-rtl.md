---
title: React Testing Library
verticalSeparator: ---//
---

## React Testing Library

<img src="./images/rtl.png" width="200px"/><br>

> Simple and complete React DOM testing utilities that encourage good testing practices.

<small>
Copyright (c) 2019 Euricom nv.
</small>

---

### React Testing Library

> The more your tests resemble the way your software is used, the more confidence they can give you.

---//

### Guiding Principles

1. If it relates to rendering components, it deals with DOM nodes rather than component instances, nor should it encourage dealing with component instances.
2. It should be generally useful for testing individual React components or full React applications.
3. Utility implementations and APIs should be simple and flexible.

---

### Getting started

```bash
npm i --save-dev @testing-library/react
npm i --save-dev @testing-library/jest-dom # custom matchers
```

> We start our journey by creating an alert component according to [bootstrap](https://getbootstrap.com/docs/4.3/components/alerts/)

---//

#### Getting started

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';

import Alert from './alert';

describe('Alert component', () => {
  test('it renders the alert', () => {
    const { getByRole } = render(<Alert />);

    getByRole('alert');
  });
});
```

---//

#### Make it pass

```js
// ./components/alert.jsx
import React from 'react';

function Alert() {
  return <div role="alert" />;
}

export default Alert;
```

---//

#### [Queries](https://testing-library.com/docs/dom-testing-library/api-queries)

- getBy\*: queries return the first matching node for a query, and throw an error if no elements match or if more than one match is found (use getAllBy instead).
- queryBy\*: queries return the first matching node for a query, and return null if no elements match. This is useful for asserting an element that is not present. This throws if more than one match is found (use queryAllBy instead).

---//

#### [Jest-dom](https://github.com/testing-library/jest-dom/blob/master/README.md)

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Alert from './alert';

describe('Alert component', () => {
  test('it renders the alert', () => {
    const { queryByRole } = render(<Alert />);

    expect(queryByRole('alert')).toBeInTheDocument();
  });
});
```

Don't repeat yourself ;)

```js
// ./jest.setup.js
import 'jest-extended';
import '@testing-library/jest-dom/extend-expect';
```

---//

#### debug

```js
test('it renders the alert', () => {
  const { queryByRole, debug } = render(<Alert />);

  debug();

  expect(queryByRole('alert')).toBeInTheDocument();
});
```

Shows the contents of your body at that exact moment

```html
console.log node_modules/@testing-library/react/dist/index.js:93
<body>
  <div>
    <div role="alert" />
  </div>
</body>
```

---//

#### debug

But you can also specify a baseElement

```js
test('it renders the alert', () => {
  const { queryByRole, debug, container } = render(<Alert />);

  debug(container);

  expect(queryByRole('alert')).toBeInTheDocument();
});
```

```html
<div>
  <div role="alert" />
</div>
```

---//

#### unmount

```js
import React from 'react';
import { render } from '@testing-library/react';

import Alert from './alert';

test('it renders the alert', () => {
  const { debug, unmount } = render(<Alert />);

  debug();

  unmount();

  debug();
});
```

---//

#### unmount

Verify the behavior

```js
import React, { useEffect } from 'react';

function Alert() {
  useEffect(() => {
    console.log('added');
    return () => {
      console.log('removed');
    };
  }, []);

  return <div role="alert" />;
}

export default Alert;
```

---//

#### cleanup

Failing to call cleanup when you've called render could result in a memory leak and tests which are not "idempotent" (which can lead to difficult to debug errors in your tests).

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render, cleanup } from '@testing-library/react';

import Alert from './alert';

afterEach(() => cleanup());

test('it renders the alert', () => {
  const { debug } = render(<Alert />);

  debug();
});
```

---//

#### cleanup

Move it to jest.setup.js

```js
import 'jest-extended';

import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react/cleanup-after-each';
```

---//

#### Fast forward

- our component should have a class alert and alert-primary by default
- our component renders its children
- our component should have a prop variant
  - oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'])

---//

#### Fast forward

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render, within } from '@testing-library/react';

import Alert from './alert';

test('it renders the alert', () => {
  const { getByRole } = render(<Alert>Message</Alert>);

  const alert = getByRole('alert');

  expect(alert).toHaveClass('alert', 'alert-primary');
});

test('it renders the children', () => {
  const { getByRole } = render(
    <Alert>
      <div data-testid="child" />
    </Alert>
  );

  const { getByTestId } = within(getByRole('alert'));

  getByTestId('child');
});

test('it can render in a different variant', () => {
  const { getByRole } = render(<Alert variant="danger">Boeh</Alert>);
  const alert = getByRole('alert');

  expect(alert).toHaveClass('alert', 'alert-danger');
});
```

---//

#### Fast forward

```js
// ./components/alert.jsx
import React from 'react';
import { node, oneOf } from 'prop-types';
import classNames from 'classnames';

function Alert({ children, variant }) {
  return (
    <div
      className={classNames('alert', {
        [`alert-${variant}`]: true
      })}
      role="alert"
    >
      {children}
    </div>
  );
}

Alert.propTypes = {
  children: node.isRequired,
  variant: oneOf([
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'dark',
    'light'
  ])
};

Alert.defaultProps = {
  variant: 'primary'
};

export default Alert;
```

---//

#### rerender

Update a components props

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';

import Alert from './alert';

test('it renders the alert', () => {
  const { getByRole, rerender } = render(<Alert>Message</Alert>);

  const alert = getByRole('alert');

  expect(alert).toHaveClass('alert', 'alert-primary');

  rerender(<Alert variant="secondary">Message</Alert>);

  expect(alert).toHaveClass('alert', 'alert-secondary');
});
```
---
### Firing events

---

### Waiting for something

---

### Resources

> See https://testing-library.com/docs/react-testing-library/cheatsheet