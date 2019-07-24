#### 1. AlertHeader

```js
// alert-header.spec.jsx
import React from 'react';
import { render, within } from '@testing-library/react';
import AlertHeader from './alert-header';

describe('Alert Header Component', () => {
  test('it renders as expected', () => {
    const { getByRole } = render(
      <AlertHeader>
        <div data-testid="child" />
      </AlertHeader>
    );

    const alertHeader = getByRole('heading');

    expect(alertHeader.nodeName).toMatch(/h4/i);
    expect(alertHeader).toHaveClass('alert-heading');

    const { getByTestId } = within(alertHeader);
    getByTestId('child');
  });

  test('ensure it augments the className prop', () => {
    const { getByRole } = render(
      <AlertHeader className="pretty">
        <div data-testid="child" />
      </AlertHeader>
    );

    const alertHeader = getByRole('heading');
    expect(alertHeader).toHaveClass('alert-heading', 'pretty');
  });
});
```

```js
// alert-header.jsx
import React from 'react';
import { string, node } from 'prop-types';
import classNames from 'classnames';

function AlertHeader({ className, children, ...props }) {
  return (
    <h4 className={classNames('alert-heading', className)} {...props}>
      {children}
    </h4>
  );
}

AlertHeader.propTypes = {
  className: string,
  children: node
};

AlertHeader.defaultProps = {
  className: undefined,
  children: undefined
};

export default AlertHeader;
```

---

#### 2. Button

```js
// ./components/button.spec.jsx
import React from 'react';
import { render, within, fireEvent } from '@testing-library/react';

import Button from './button';

describe('Button component', () => {
  test('it renders by default as a primary button', () => {
    const { getByRole } = render(<Button>Click me</Button>);

    const button = getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary');

    expect(button).toHaveAttribute('type', 'button');
  });

  test('it adds the className classes', () => {
    const { getByRole } = render(<Button className="custom">Click Me</Button>);

    const button = getByRole('button');
    expect(button).toHaveClass('btn', 'btn-primary', 'custom');
  });

  describe('type', () => {
    test('it can render as button', () => {
      const { getByRole } = render(<Button type="button">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    test('it can render as submit', () => {
      const { getByRole } = render(<Button type="submit">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('it can render as reset', () => {
      const { getByRole } = render(<Button type="reset">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });
  });

  describe('variant', () => {
    test('it can render as primary', () => {
      const { getByRole } = render(<Button variant="primary">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveClass('btn-primary');
    });

    test('it can render as secondary', () => {
      const { getByRole } = render(<Button variant="secondary">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveClass('btn-secondary');
    });

    test('it can render as link', () => {
      const { getByRole } = render(<Button variant="link">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveClass('btn-link');
    });
  });

  describe('size', () => {
    test('it can be a small one', () => {
      const { getByRole } = render(<Button size="small">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveClass('btn-sm');
    });

    test('it can be a large one', () => {
      const { getByRole } = render(<Button size="large">Hello</Button>);

      const button = getByRole('button');
      expect(button).toHaveClass('btn-lg');
    });
  });

  test('it renders the children', () => {
    const { getByRole } = render(
      <Button>
        <div data-testid="child" />
      </Button>
    );

    const { getByTestId } = within(getByRole('button'));
    getByTestId('child');
  });

  test('it can be disabled', () => {
    const { getByRole } = render(<Button disabled>Click Me</Button>);
    expect(getByRole('button')).toBeDisabled();
  });

  test('it can be clicked', () => {
    const onClick = jest.fn();
    const { getByRole } = render(<Button onClick={onClick}>Click Me</Button>);

    const button = getByRole('button');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
```

```js
// ./components/button.jsx
import React from 'react';
import classNames from 'classnames';
import { oneOf, string } from 'prop-types';

const BS_PREFIX = 'btn';
const BUTTON_SIZES = {
  small: 'sm',
  large: 'lg'
};

function Button({ className, size, type, variant, ...rest }) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button
      type={type}
      className={classNames(
        BS_PREFIX,
        {
          [`${BS_PREFIX}-${variant}`]: true,
          [`${BS_PREFIX}-${BUTTON_SIZES[size]}`]: size
        },
        className
      )}
      {...rest}
    />
  );
}

Button.propTypes = {
  className: string,
  size: oneOf(Object.keys(BUTTON_SIZES)),
  type: oneOf(['button', 'submit', 'reset']),
  variant: oneOf(['primary', 'secondary', 'link'])
};

Button.defaultProps = {
  className: undefined,
  size: undefined,
  type: 'button',
  variant: 'primary'
};

export default Button;
```
