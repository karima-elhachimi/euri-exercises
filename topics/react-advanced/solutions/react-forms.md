### Exercise 1 - Create the login form

```js
// src/js/modules/login/services/authentication-service.spec.js
import authenticationService from './authentication-service';

describe('Authentication service', () => {
  describe('validateUser', () => {
    test('it returns true when username and password are correct', () => {
      const result = authenticationService.validateUser('admin', 'secret');

      expect(result).toBe(true);
    });

    test('it returns false when username is incorrect', () => {
      const result = authenticationService.validateUser('admina', 'secret');

      expect(result).toBe(false);
    });

    test('it returns false when password is incorrect', () => {
      const result = authenticationService.validateUser('admin', 'secret2');

      expect(result).toBe(false);
    });

    test('ensure it returns true for user and pass', () => {
      const result = authenticationService.validateUser('user', 'pass');

      expect(result).toBe(true);
    });
  });
});
```

```js
// src/js/modules/login/services/authentication-service.js
const logins = [
  {
    username: 'admin',
    password: 'secret'
  },
  {
    username: 'user',
    password: 'pass'
  }
];

function validateUser(username, password) {
  return logins.some(
    login => login.username === username && login.password === password
  );
}

export default {
  validateUser
};
```

```jsx
// src/js/modules/login/login.spec.jsx
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Route } from 'react-router';
import { createMemoryHistory } from 'history';

import { renderWithRouter } from '../../../../test/react-testing-helpers';
import IdentityContext from '../../contexts/identity-context';
import authenticationServiceMock from './services/authentication-service';
import Login from './login';

jest.mock('./services/authentication-service.js');

describe('login component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

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

  describe('not authenticated', () => {
    test('it renders the sign in header', () => {
      const { getByRole } = render();

      const header = getByRole('heading');
      expect(header).toHaveClass('card-title');
      expect(header).toHaveTextContent(/sign in/i);
    });

    test('it authenticates the user when form input is valid', () => {
      authenticationServiceMock.validateUser.mockReturnValue(true);

      const {
        getByLabelText,
        getByText,
        onAuthenticated,
        queryByRole
      } = render();

      // ensure no alert visible
      expect(queryByRole('alert')).not.toBeInTheDocument();

      // verify username input
      const userNameInput = getByLabelText(/your username/i);
      expect(userNameInput).toHaveFocus();

      // verify password input
      const passwordInput = getByLabelText(/your password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');

      // set values
      fireEvent.change(userNameInput, { target: { value: 'admin' } });
      fireEvent.change(passwordInput, { target: { value: 'secret' } });

      // Click login
      fireEvent.click(getByText(/login/i));
      expect(authenticationServiceMock.validateUser).toHaveBeenCalledWith(
        'admin',
        'secret'
      );
      expect(onAuthenticated).toHaveBeenCalledWith('admin');
    });

    test('guard it does not authenticate the user when username or password is invalid', () => {
      authenticationServiceMock.validateUser.mockReturnValue(false);

      const {
        getByLabelText,
        getByText,
        onAuthenticated,
        getByRole
      } = render();

      const userNameInput = getByLabelText(/your username/i);
      const passwordInput = getByLabelText(/your password/i);

      fireEvent.change(userNameInput, { target: { value: 'unknown' } });
      fireEvent.change(passwordInput, { target: { value: 'secret' } });

      // Click login
      fireEvent.click(getByText(/login/i));

      // verify not authenticated
      expect(onAuthenticated).not.toHaveBeenCalled();

      // verify form reset
      expect(userNameInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');

      // verify alert role
      expect(getByRole('alert')).toHaveTextContent(/unknown user or password/i);

      // set focus back to username
      expect(userNameInput).toHaveFocus();
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
// src/js/modules/login/components/login-form.jsx
import React, { useRef, useEffect } from 'react';
import { func } from 'prop-types';

import authenticationService from '../services/authentication-service';
import Button from '../../../components/button';

function LoginForm({ onSuccess, onFail }) {
  const userNameInput = useRef();
  const passwordInput = useRef();

  useEffect(() => {
    userNameInput.current.focus();
  }, []);

  const handleSubmit = evt => {
    const username = userNameInput.current.value;

    if (
      authenticationService.validateUser(username, passwordInput.current.value)
    ) {
      onSuccess(username);
    } else onFail();

    evt.target.reset();
    evt.preventDefault();
    userNameInput.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Your username</label>
        <input
          className="form-control"
          placeholder="username"
          type="text"
          id="username"
          ref={userNameInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Your password</label>
        <input
          className="form-control"
          placeholder="******"
          type="password"
          id="password"
          ref={passwordInput}
        />
      </div>
      <div className="form-group">
        <Button type="submit" className="btn-block">
          Login
        </Button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  onSuccess: func.isRequired,
  onFail: func
};

LoginForm.defaultProps = {
  onFail: () => {}
};

export default LoginForm;
```

```jsx
// src/js/modules/login/login.jsx
import React, { useContext, useState, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { func, shape, string } from 'prop-types';
import IdentityContext from '../../contexts/identity-context';
import LoginForm from './components/login-form';

function Login({
  onAuthenticated,
  location: { state: { from } = { from: { pathname: '/' } } }
}) {
  const currentIdentity = useContext(IdentityContext);
  const [lastLoginFailed, setLastLoginFailed] = useState(false);

  const handleSuccess = useCallback(
    username => {
      setLastLoginFailed(false);
      onAuthenticated(username);
    },
    [onAuthenticated]
  );

  const handleFailure = useCallback(() => {
    setLastLoginFailed(true);
  }, []);

  if (currentIdentity) return <Redirect to={from} />;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="card col-sm-6">
          <div className="card-body">
            <h4 className="card-title">Sign in</h4>
            {lastLoginFailed && (
              <p className="text-danger text-center" role="alert">
                Unknown user or password
              </p>
            )}
            <LoginForm onSuccess={handleSuccess} onFail={handleFailure} />
          </div>
        </div>
      </div>
    </div>
  );
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
