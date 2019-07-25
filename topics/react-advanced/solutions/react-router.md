#### 1. Layout app

```jsx
// ./src/js/app.spec.jsx
import React from 'react';

// import HomeMock from './modules/home/home';
import { App } from './app';
import { renderWithRouter } from '../../test/react-testing-helpers';

jest.mock('./modules/home/home', () => () => (
  <div data-testid="HomeModuleMock" />
));
jest.mock('./modules/login/login', () => () => (
  <div data-testid="LoginModuleMock" />
));
jest.mock('./pages/not-found.jsx', () => () => (
  <div data-testid="NotFoundPageMock" />
));

describe('App component', () => {
  describe('routing', () => {
    describe('/', () => {
      test('it renders the home module', () => {
        const { getByTestId } = renderWithRouter(<App />);
        getByTestId('HomeModuleMock');
      });

      test('guard it does not render the not found page', () => {
        const { queryByTestId } = renderWithRouter(<App />, {
          route: '/login'
        });
        expect(queryByTestId('NotFoundPageMock')).not.toBeInTheDocument();
      });
    });

    describe('/login', () => {
      test('it renders the login module', () => {
        const { getByTestId } = renderWithRouter(<App />, { route: '/login' });
        getByTestId('LoginModuleMock');
      });

      test('guard it does not render the home module', () => {
        const { queryByTestId } = renderWithRouter(<App />, {
          route: '/login'
        });
        expect(queryByTestId('HomeModuleMock')).not.toBeInTheDocument();
      });

      test('guard it does not render the not found page', () => {
        const { queryByTestId } = renderWithRouter(<App />, {
          route: '/login'
        });
        expect(queryByTestId('NotFoundPageMock')).not.toBeInTheDocument();
      });
    });

    describe('/some-unknown-path', () => {
      test('it renders the NotFound page', () => {
        const { getByTestId } = renderWithRouter(<App />, {
          route: '/some-unknown-path'
        });
        getByTestId('NotFoundPageMock');
      });

      test('guard it does not render the home module', () => {
        const { queryByTestId } = renderWithRouter(<App />, {
          route: '/some-unknown-path'
        });
        expect(queryByTestId('HomeModuleMock')).not.toBeInTheDocument();
      });

      test('guard it does not render the login module', () => {
        const { queryByTestId } = renderWithRouter(<App />, {
          route: '/some-unknown-path'
        });
        expect(queryByTestId('LoginModuleMock')).not.toBeInTheDocument();
      });
    });
  });
});
```

```jsx
// ./src/js/app.jsx
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './modules/home/home';
import Login from './modules/login/login';
import PageNotFound from './pages/not-found';

export function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

function RoutedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default hot(RoutedApp);
```

---
