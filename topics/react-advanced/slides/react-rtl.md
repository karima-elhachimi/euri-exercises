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

1. If it relates to rendering components, it deals with DOM nodes rather than component instances.
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

Failing to call cleanup when you've called render could result in a memory leak and tests which are not "idempotent" (which can lead to difficult to debug errors).

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
import { render, within, fireEvent } from '@testing-library/react';

import Alert from './alert';

describe('Alert component', () => {
  test('it renders the alert', () => {
    const { getByRole } = render(
      <Alert>
        <div data-testid="child" />
      </Alert>
    );

    // verify rendering
    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert', 'alert-primary');

    // verify it renders children
    const { getByTestId } = within(alert);
    getByTestId('child');
  });

  test('it allows to specify a variant', () => {
    const { getByRole } = render(<Alert variant="danger">My Message</Alert>);
    const alert = getByRole('alert');

    expect(alert).toHaveClass('alert', 'alert-danger');
  });
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

```js
import { fireEvent } from '@testing-library/react';
```

> The story continues to make our alert component dismissible

---//

#### Firing events

```js
// ./components/alert.spec.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Alert from './alert';

describe('Alert component', () => {
  // ...

  test('it renders as dismissible', () => {
    const { getByRole, container } = render(
      <Alert dismissible>My message</Alert>
    );

    // it adds the class
    const alert = getByRole('alert');
    expect(alert).toHaveClass('alert-dismissible');
  });
});
```

---//

#### Firing events - dismissible class

```js
function Alert({ children, dismissible, variant }) {
  return (
    <div
      className={classNames('alert', {
        [`alert-${variant}`]: true,
        'alert-dismissible': dismissible
      })}
      role="alert"
    >
      {children}
    </div>
  );
}

Alert.propTypes = {
  //...
  dismissible: bool
};

Alert.defaultProps = {
  dismissible: undefined
};
```

---//

#### Firing events - button

```js
test('it renders as dismissible', () => {
  const { getByRole, container } = render(
    <Alert dismissible>My message</Alert>
  );

  // it adds the class
  const alert = getByRole('alert');
  expect(alert).toHaveClass('alert-dismissible');

  // it adds a button
  const button = container.querySelector('button[aria-label="Close"]');
  expect(button).toBeInTheDocument();
});
```

---//

#### Firing events - button

```js
// ./components/alert.jsx
{
  dismissible && (
    <button type="button" className="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
```

---//

#### Firing events -button

```js
import { render, fireEvent } from '@testing-library/react';

test('it renders as dismissible', () => {
  const { getByRole, container } = render(
    <Alert dismissible>My message</Alert>
  );

  const alert = getByRole('alert');
  // ...

  // it adds a button
  const button = container.querySelector('button[aria-label="Close"]');
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(alert).not.toBeInTheDocument();
});
```

> Let's make it work ;)

---

### Waiting for something

> see https://testing-library.com/docs/dom-testing-library/api-async

---//

#### Waiting for something

- wait (Promise) retry the function within until it stops throwing or times out
- waitForElement (Promise) retry the function until it returns an element or an array of elements

  - findBy and findAllBy queries are async and retry

- waitForDomChange (Promise) retry the function each time the DOM is changed
- waitForElementToBeRemoved (Promise) retry the function until it no longer returns a DOM node

---//

#### Waiting for something

What if dismissing of our alert came with a small delay?

```js
function Alert({ children, dismissible, variant }) {
  const [dismissed, setDismissed] = useState(false);

  const dismiss = () => {
    setTimeout(() => {
      setDismissed(true);
    }, 50);
  };

  if (dismissed) return null;
  // ...
}
```

> Our test would start failing!

---//

#### Waiting for something - failing test

```js
import { render, fireEvent } from '@testing-library/react';

test('it renders as dismissible', () => {
  const { getByRole, container } = render(
    <Alert dismissible>My message</Alert>
  );

  // it adds a button
  const button = container.querySelector('button[aria-label="Close"]');
  fireEvent.click(button);

  // ==> FAILS ON THIS LINE
  expect(alert).not.toBeInTheDocument();
});
```

---//

#### Waiting for something - make the test work

```js
test('it renders as dismissible', async () => {
  const { getByRole, queryByRole, container } = render(
    <Alert dismissible>My message</Alert>
  );

  // it adds the class
  const alert = getByRole('alert');

  const button = container.querySelector('button[aria-label="Close"]');

  fireEvent.click(button);

  await waitForElementToBeRemoved(() => queryByRole('alert'));
});
```

> Warning: An update to Alert inside a test was not wrapped in act(...).

---//

#### Waiting for something - make the test work

This is a known [issue](https://github.com/testing-library/react-testing-library/issues/281) that will be solved in React 16.9.0

```js
// jest.setup.js

// Remove this after react 16.9.0
// Silence a warning that we'll get until react
// fixes this: https://github.com/facebook/react/pull/14853
const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
```

---

### Resources

> See https://testing-library.com/docs/react-testing-library/cheatsheet

---

### Exercises

> Knowledge is of no value unless you put it into practice.

<small>
Anton Checkov
</small>

---//

#### 1. AlertHeader

Create an supplementary AlertHeader component according to [bootstrap spec](https://getbootstrap.com/docs/4.3/components/alerts/#additional-content)

- should have role heading (implicit)
- element type should be a h4
- should have class alert-heading
- should be able to render children
- should be able to add classes trough className prop

---//

#### 2. Button

Create a button component that implement [bootstrap spec](https://getbootstrap.com/docs/4.3/components/buttons/)

- variants: primary(default), secondary or link
- size: small or large, default is none
- type: button (default <=> react), submit or reset
- should be able to add classes trough className prop
- use as less propType declarations as possible
- should be able to render children
- should be able to provide disabled
- should be able to provide onClick

---//

#### 3. User Counter Badge

Create the following async component

```html
<button type="button" class="btn btn-primary">
  Users <span class="badge badge-light">4</span>
</button>
```

- render loading as badge content by default
- reuse the button component
- create a badge component if you want ;)
- use the listPaged from react-http exercise as starting point to get the total amount of users
