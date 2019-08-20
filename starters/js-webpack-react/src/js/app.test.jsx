import React from 'react';
import { render as renderRtl } from '@testing-library/react';

import { App } from './app';

describe('App', () => {
  function render() {
    return renderRtl(<App />);
  }

  it('it renders as expected', () => {
    const { container } = render();

    expect(container).toMatchSnapshot();
  });

  describe('preferred way of writing test which enables tdd', () => {
    test('it renders the js logo', () => {
      const { getByAltText } = render();

      const logo = getByAltText(/js logo/i);

      expect(logo).toHaveAttribute('src', 'public/images/js-logo.png');
    });

    test('it renders the welcome message', () => {
      const { getByTestId } = render();

      const welcomeMessage = getByTestId('welcome-message');

      expect(welcomeMessage).toHaveTextContent('Hello from ES2015+');
    });
  });
});
