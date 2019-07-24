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
import { string } from 'prop-types';
import classNames from 'classnames';

function AlertHeader({ className, ...props }) {

  return (
    <h4 className={classNames('alert-heading', className)} {...props} />
  )
}

AlertHeader.propTypes = {
  className: string,
}

AlertHeader.defaultProps = {
  className: undefined,
}

export default AlertHeader;

```
