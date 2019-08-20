#### 1. Layout app

```jsx
// ./src/js/app.spec.jsx
import React from 'react';

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

#### 2. Login/logout flow - impl

```jsx
// src/js/contexts/identity-context.js
import { createContext } from 'react';

const IdentityContext = createContext();

export default IdentityContext;
```

```jsx
// src/js/app.jsx
import React, { useState, useCallback } from 'react';
import { hot } from 'react-hot-loader/root';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from 'react-router-dom';
import { string, node } from 'prop-types';

import Home from './modules/home/home';
import Login from './modules/login/login';
import PageNotFound from './pages/not-found';
import JsLogo from '../public/images/js-logo.png';

import IdentityContext from './contexts/identity-context';

export function App({ initialIdentity, children }) {
  const [currentIdentity, setCurrentIdentity] = useState(initialIdentity);

  const onAuthenticated = useCallback(
    identity => setCurrentIdentity(identity),
    []
  );

  return (
    <IdentityContext.Provider value={currentIdentity}>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img
            src={JsLogo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Bootcamp Logo"
          />{' '}
          Bootcamp
        </Link>
        {currentIdentity ? (
          <Link to="/logout">Log Out</Link>
        ) : (
          <Link to="/login">Log In</Link>
        )}
      </nav>
      <div className="container-fluid main">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            render={() => <Login onAuthenticated={onAuthenticated} />}
          />
          <Route
            path="/logout"
            render={() => {
              if (currentIdentity) setCurrentIdentity();
              return <Redirect to="/" />;
            }}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
      {children}
    </IdentityContext.Provider>
  );
}

App.propTypes = {
  initialIdentity: string,
  children: node
};

App.defaultProps = {
  initialIdentity: undefined,
  children: undefined
};

function RoutedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default hot(RoutedApp);
```

```jsx
// src/js/modules/home/home.jsx
import React, { useContext } from 'react';
import IdentityContext from '../../contexts/identity-context';

function Home() {
  const currentIdentity = useContext(IdentityContext);

  return (
    <h1>
      {currentIdentity ? `Hello ${currentIdentity}` : 'Welcome, please log in'}
    </h1>
  );
}

export default Home;
```

```jsx
// src/js/modules/login/login.jsx
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { func } from 'prop-types';
import Button from '../../components/button';
import IdentityContext from '../../contexts/identity-context';

function Login({ onAuthenticated }) {
  const currentIdentity = useContext(IdentityContext);

  if (currentIdentity) return <Redirect to="/" />;

  return <Button onClick={() => onAuthenticated('admin')}>Login</Button>;
}

Login.propTypes = {
  onAuthenticated: func.isRequired
};

export default Login;
```

---

#### 2. Login/logout flow - specs

```jsx
// src/js/app.spec.jsx
import React, { useContext } from 'react';
import { within, fireEvent } from '@testing-library/react';

import { App } from './app';
import { renderWithRouter } from '../../test/react-testing-helpers';
import IdentityContext from './contexts/identity-context';

jest.mock('./modules/home/home', () => () => (
  <div data-testid="HomeModuleMock" />
));

jest.mock('./modules/login/login', () => {
  // eslint-disable-next-line react/prop-types
  function LoginComponentMock({ onAuthenticated }) {
    return (
      <div data-testid="LoginModuleMock">
        <button
          data-testid="LogonTrigger"
          type="button"
          onClick={() => onAuthenticated('fake-user')}
        />
      </div>
    );
  }

  return LoginComponentMock;
});

jest.mock('./pages/not-found.jsx', () => () => (
  <div data-testid="NotFoundPageMock" />
));

function IdentityPrinter() {
  const currentIdentity = useContext(IdentityContext);

  return (
    <div data-testid="identity-printer">{currentIdentity || 'anonymous'}</div>
  );
}

describe('App component', () => {
  describe('nav bar', () => {
    test('it renders the nav with a clickable brand', () => {
      const { getByRole, history } = renderWithRouter(<App />, '/another');
      const navbar = getByRole('navigation');

      const { getByAltText, getByText } = within(navbar);
      expect(getByAltText(/bootcamp logo/i)).toHaveAttribute(
        'src',
        'public/images/js-logo.png'
      );

      const brand = getByText(/bootcamp/i);
      fireEvent.click(brand);

      expect(history).toHaveProperty('location.pathname', '/');
    });

    describe('anonymous', () => {
      test('it renders a login link', () => {
        const { getByRole } = renderWithRouter(<App />);

        const { getByText } = within(getByRole('navigation'));

        expect(getByText(/log in/i)).toHaveAttribute('href', '/login');
      });

      test('guard it does not render the logout link', () => {
        const { getByRole } = renderWithRouter(<App />);

        const { queryByText } = within(getByRole('navigation'));
        expect(queryByText(/log out/i)).not.toBeInTheDocument();
      });
    });

    describe('authenticated', () => {
      test('it renders a logout link', () => {
        const { getByRole } = renderWithRouter(<App initialIdentity="John" />);

        const { getByText } = within(getByRole('navigation'));

        const logOutLink = getByText(/log out/i);
        expect(logOutLink).toHaveAttribute('href', '/logout');
      });

      test('guard it does not render the login link', () => {
        const { getByRole } = renderWithRouter(<App initialIdentity="John" />);

        const { queryByText } = within(getByRole('navigation'));
        expect(queryByText(/log in/i)).not.toBeInTheDocument();
      });
    });
  });

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
        const { getByTestId } = renderWithRouter(
          <App>
            <IdentityPrinter />
          </App>,
          { route: '/login' }
        );

        getByTestId('LoginModuleMock');

        fireEvent.click(getByTestId('LogonTrigger'));
        expect(getByTestId('identity-printer')).toHaveTextContent('fake-user');
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

    describe('/logout', () => {
      test('it redirects to home and logs out', () => {
        const { history, getByTestId } = renderWithRouter(
          <App initialIdentity="someone">
            <IdentityPrinter />
          </App>,
          {
            route: '/logout'
          }
        );

        expect(history).toHaveProperty('location.pathname', '/');
        expect(getByTestId('identity-printer')).toHaveTextContent('anonymous');
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
// src/js/modules/home/home.spec.jsx
import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';
import IdentityContext from '../../contexts/identity-context';

describe('Home', () => {
  test('it greets and suggests to login when not logged in', () => {
    const { getByRole } = render(<Home />);

    expect(getByRole('heading')).toHaveTextContent(/welcome, please log in/i);
  });

  test('it greets the user when logged in', () => {
    const { getByRole } = render(
      <IdentityContext.Provider value="John">
        <Home />
      </IdentityContext.Provider>
    );

    expect(getByRole('heading')).toHaveTextContent(/hello john/i);
  });
});
```

```jsx
// src/js/modules/login/login.spec.jsx
import React from 'react';
import { fireEvent } from '@testing-library/react';

import { renderWithRouter } from '../../../../test/react-testing-helpers';
import IdentityContext from '../../contexts/identity-context';
import Login from './login';

describe('login component', () => {
  function render(
    currentIdentity = undefined,
    { onAuthenticated = jest.fn() } = {}
  ) {
    return {
      ...renderWithRouter(
        <IdentityContext.Provider value={currentIdentity}>
          <Login onAuthenticated={onAuthenticated} />
        </IdentityContext.Provider>,
        { route: '/login' }
      ),
      onAuthenticated
    };
  }

  describe('default', () => {
    test('it calls the onAuthenticated prop when clicking on the login button', () => {
      const { getByText, onAuthenticated } = render();

      const loginButton = getByText(/login/i);

      fireEvent.click(loginButton);

      expect(onAuthenticated).toHaveBeenCalledWith('admin');
    });
  });

  describe('already authenticated', () => {
    test('it redirects to home', () => {
      const { onAuthenticated, history } = render('someone');

      expect(history).toHaveProperty('location.pathname', '/');
      expect(onAuthenticated).not.toHaveBeenCalled();
    });
  });
});
```

---

### Exercise 3 Listing users

#### Exercise 3.1 Users Module

```jsx
// src/js/app.spec.jsx
import UsersModuleMock from './modules/users/users';

jest.mock(
  //
  './modules/users/users',
  () => jest.fn().mockReturnValue(<div data-testid="UsersModuleMock" />)
);

describe('App component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ...

  describe('/users', () => {
    test('it renders the user module', () => {
      const { getByTestId } = renderWithRouter(<App />, { route: '/users' });
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith({}, expect.toBeObject());
    });

    test('it renders the user module with parsed page', () => {
      const { getByTestId } = renderWithRouter(<App />, {
        route: '/users?page=2'
      });
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith(
        {
          page: 2
        },
        expect.toBeObject()
      );
    });

    test('it renders the user module with parsed limit', () => {
      const { getByTestId } = renderWithRouter(<App />, {
        route: '/users?limit=20'
      });
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith(
        {
          limit: 20
        },
        expect.toBeObject()
      );
    });
  });
});
```

```jsx
// src/js/app.jsx
import Users from './modules/users/users';

<Route
  path="/users"
  render={({ location: { search } }) => {
    const query = new URLSearchParams(search);

    const queryProps = {};
    if (query.has('page')) queryProps.page = +query.get('page');
    if (query.has('limit')) queryProps.limit = +query.get('limit');

    return <Users {...queryProps} />;
  }}
/>;
```

```jsx
// src/js/modules/users/users.spec.jsx
import React from 'react';

import { render } from '@testing-library/react';
import Users from './users';

describe('Users', () => {
  test('it renders a heading', () => {
    const { getByRole } = render(<Users />);

    const header = getByRole('heading');
    expect(header).toHaveTextContent(/users/i);
  });

  describe('page', () => {
    test('it renders the badge with page 1 by default', () => {
      const { getByTestId } = render(<Users />);

      expect(getByTestId('page-badge')).toHaveTextContent(/p 1/i);
    });

    test('it renders the badge according to page', () => {
      const { getByTestId } = render(<Users page={2} />);

      expect(getByTestId('page-badge')).toHaveTextContent(/p 2/i);
    });
  });

  describe('limit', () => {
    test('it renders the badge with limit 10 by default', () => {
      const { getByTestId } = render(<Users />);

      expect(getByTestId('limit-badge')).toHaveTextContent(/l 10/i);
    });

    test('it renders the badge according to limit', () => {
      const { getByTestId } = render(<Users limit={20} />);

      expect(getByTestId('limit-badge')).toHaveTextContent(/l 20/i);
    });
  });
});
```

```jsx
// src/js/modules/users/users.jsx
import React from 'react';
import { number } from 'prop-types';

import Badge from '../../components/badge';

function Users({ page, limit }) {
  return (
    <h1>
      {'Users '}
      <Badge //
        variant="success"
        data-testid="page-badge"
      >
        {`P ${page}`}
      </Badge> <Badge //
        variant="danger"
        data-testid="limit-badge"
      >
        {`L ${limit}`}
      </Badge>
    </h1>
  );
}

Users.propTypes = {
  page: number,
  limit: number
};

Users.defaultProps = {
  page: 1,
  limit: 10
};

export default Users;
```

---

#### Exercise 3.2 Protect it

```jsx
// src/js/components/protected-route.spec.jsx
import React from 'react';

import { renderWithRouter } from '../../../test/react-testing-helpers';
import IdentityContext from '../contexts/identity-context';
import ProtectedRoute from './protected-route';

describe('Protected route component', () => {
  function render(
    identity = undefined,
    { path = '/some-route', ...rest } = {}
  ) {
    return renderWithRouter(
      <IdentityContext.Provider value={identity}>
        <ProtectedRoute path={path} {...rest} />
      </IdentityContext.Provider>,
      { route: '/some-route' }
    );
  }

  describe('when authenticated', () => {
    test('it renders the route when using component', () => {
      const component = jest
        .fn()
        .mockReturnValue(<div data-testid="route-mock" />);

      const { getByTestId } = render('someone', {
        component
      });

      getByTestId('route-mock');

      expect(component).toHaveBeenCalledWith(
        expect.toContainKeys(['history', 'location', 'match']),
        {}
      );
    });

    test('it renders the route when using render', () => {
      const renderProp = jest
        .fn()
        .mockReturnValue(<div data-testid="route-mock" />);

      const { getByTestId } = render('someone', {
        render: renderProp
      });

      getByTestId('route-mock');

      expect(renderProp).toHaveBeenCalledWith(
        expect.toContainKeys(['history', 'location', 'match'])
      );
    });

    test('it renders the route with component when using both', () => {
      const component = jest
        .fn()
        .mockReturnValue(<div data-testid="component-route-mock" />);
      const renderProp = jest
        .fn()
        .mockReturnValue(<div data-testid="render-route-mock" />);

      const { getByTestId } = render('someone', {
        component,
        render: renderProp
      });

      getByTestId('component-route-mock');

      expect(component).toHaveBeenCalledWith(
        expect.toContainKeys(['history', 'location', 'match']),
        {}
      );
    });
  });

  describe('when anonymous', () => {
    test('it redirects to /login', () => {
      const component = jest
        .fn()
        .mockReturnValue(<div data-testid="route-mock" />);
      const { history } = render(undefined, { component });

      expect(history).toHaveProperty('location.pathname', '/login');
      expect(history).toHaveProperty(
        'location.state.from.pathname',
        '/some-route'
      );
      expect(component).not.toHaveBeenCalled();
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
```

```jsx
// src/js/components/protected-route.jsx
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { any, func } from 'prop-types';
import IdentityContext from '../contexts/identity-context';

function ProtectedRoute({ component: Component, render, ...rest }) {
  const currentIdentity = useContext(IdentityContext);

  return (
    <Route
      {...rest}
      render={props => {
        if (!currentIdentity) {
          // eslint-disable-next-line react/prop-types
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        if (Component) return <Component {...props} />;

        return render(props);
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  component: any,
  render: func
};

ProtectedRoute.defaultProps = {
  component: undefined,
  render: undefined
};

export default ProtectedRoute;
```

---

#### Exercise 3.3 Adapt users route

```jsx
// src/js/app.spec.jsx
describe('nav bar', () => {
  describe('links', () => {
    test('it renders a link to our users route', () => {
      const { getByRole } = renderWithRouter(<App />);

      const { getByText } = within(getByRole('navigation'));

      expect(getByText(/users/i)).toHaveAttribute('href', '/users');
    });

    test('it marks the users link active when route is /users', () => {
      // 🤪 We have to be authenticated otherwise our protected route will redirect to /login
      const { getByRole } = renderWithRouter(<App initialIdentity="John" />, {
        route: '/users'
      });

      const { getByText } = within(getByRole('navigation'));

      expect(getByText(/users/i)).toHaveClass('active');
    });
  });
});

describe('/users', () => {
  describe('when anonymous', () => {
    test('it redirects to /login, preserving state from', () => {
      const { history } = renderWithRouter(<App />, {
        route: '/users'
      });

      expect(history).toHaveProperty('location.pathname', '/login');
      expect(history).toHaveProperty('location.state.from.pathname', '/users');
    });
  });

  describe('when authenticated', () => {
    test('it renders the user module', () => {
      const { getByTestId } = renderWithRouter(
        <App initialIdentity="someone" />,
        {
          route: '/users'
        }
      );
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith({}, expect.toBeObject());
    });

    test('it renders the user module with parsed page', () => {
      const { getByTestId } = renderWithRouter(
        <App initialIdentity="someone" />,
        {
          route: '/users?page=2'
        }
      );
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith(
        {
          page: 2
        },
        expect.toBeObject()
      );
    });

    test('it renders the user module with parsed limit', () => {
      const { getByTestId } = renderWithRouter(
        <App initialIdentity="someone" />,
        {
          route: '/users?limit=20'
        }
      );
      getByTestId('UsersModuleMock');

      expect(UsersModuleMock).toHaveBeenCalledWith(
        {
          limit: 20
        },
        expect.toBeObject()
      );
    });
  });
});
```

```jsx
// src/js/app.jsx
import ProtectedRoute from './components/protected-route';

// Add the nav-link
<nav className="navbar navbar-light bg-light">
  <Link className="navbar-brand" to="/">
    <img
      src={JsLogo}
      width="30"
      height="30"
      className="d-inline-block align-top"
      alt="Bootcamp Logo"
    />
    {' Bootcamp'}
  </Link>
  <ul className="navbar-nav mr-auto">
    <li className="nav-item">
      <NavLink className="nav-link" to="/users">
        Users
      </NavLink>
    </li>
  </ul>
</nav>

// Change the users route to protected
<ProtectedRoute path="/users" />;
```

#### Exercise 3.4 Adapt Login

```jsx
// src/js/modules/login/login.spec.jsx
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Route } from 'react-router';
import { createMemoryHistory } from 'history';

import { renderWithRouter } from '../../../../test/react-testing-helpers';
import IdentityContext from '../../contexts/identity-context';
import Login from './login';

describe('login component', () => {
  function render(
    currentIdentity = undefined,
    { onAuthenticated = jest.fn() } = {},
    history
  ) {
    return {
      ...renderWithRouter(
        <IdentityContext.Provider value={currentIdentity}>
          <Route
            path="/login"
            render={() => <Login onAuthenticated={onAuthenticated} />}
          />
        </IdentityContext.Provider>,
        { route: '/login', history }
      ),
      onAuthenticated
    };
  }

  describe('default', () => {
    test('it calls the onAuthenticated prop when clicking on the login button', () => {
      const { getByText, onAuthenticated } = render();

      const loginButton = getByText(/login/i);

      fireEvent.click(loginButton);

      expect(onAuthenticated).toHaveBeenCalledWith('admin');
    });
  });

  describe('already authenticated', () => {
    test('it redirects to home if no state from', () => {
      const { onAuthenticated, history } = render('someone');

      expect(history).toHaveProperty('location.pathname', '/');
      expect(onAuthenticated).not.toHaveBeenCalled();
    });

    test('it redirects to state from', () => {
      const history = createMemoryHistory();
      history.replace('/login', {
        from: {
          pathname: '/secured',
          search: '',
          hash: '',
          key: 'KEY'
        }
      });

      const { onAuthenticated } = render('someone', undefined, history);

      expect(history).toHaveProperty('location.pathname', '/secured');
      expect(onAuthenticated).not.toHaveBeenCalled();
    });
  });
});
```

```jsx
// src/js/modules/login/login.jsx
import React, { useContext } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { func, shape, string } from 'prop-types';
import Button from '../../components/button';
import IdentityContext from '../../contexts/identity-context';

function Login({
  onAuthenticated,
  location: { state: { from } = { from: { pathname: '/' } } }
}) {
  const currentIdentity = useContext(IdentityContext);

  if (currentIdentity) return <Redirect to={from} />;

  return <Button onClick={() => onAuthenticated('admin')}>Login</Button>;
}

Login.propTypes = {
  onAuthenticated: func.isRequired,
  location: shape({
    state: shape({
      from: shape({
        pathname: string.isRequired,
        search: string,
        hash: string,
        key: string
      })
    })
  }).isRequired
};

export default withRouter(Login);
```
