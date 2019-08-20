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

---

### Exercise 2 - User Detail Form

```jsx
// src/js/modules/users-detail/components/user-form.spec.jsx
import React from 'react';
import { render as renderRtl, fireEvent } from '@testing-library/react';
import UserForm from './user-form';

describe('User Form', () => {
  function render(props = { initialValues: undefined, onSubmit: () => {} }) {
    return renderRtl(
      <UserForm initialValues={props.initialValues} onSubmit={props.onSubmit} />
    );
  }

  test('it renders the form as expected', () => {
    const { getByLabelText } = render();

    const firstNameInput = getByLabelText(/first name/i);
    expect(firstNameInput).toHaveProperty('placeholder', 'Enter First Name');
    expect(firstNameInput).toHaveAttribute('required');
    expect(firstNameInput).toHaveAttribute('maxlength', '30');
    expect(firstNameInput).toHaveValue('');

    const lastNameInput = getByLabelText(/last name/i);
    expect(lastNameInput).toHaveProperty('placeholder', 'Enter Last Name');
    expect(lastNameInput).toHaveAttribute('required');
    expect(lastNameInput).toHaveAttribute('maxlength', '80');
    expect(lastNameInput).toHaveValue('');

    const isFamilyInput = getByLabelText(/family/i);
    expect(isFamilyInput).toHaveProperty('checked', false);
  });

  test('it adheres to initialValues passed', () => {
    const initialValues = {
      firstName: 'Jane',
      lastName: 'Doe',
      isFamily: true
    };
    const { getByLabelText } = render({ initialValues });

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const familyInput = getByLabelText(/family/i);

    expect(firstNameInput).toHaveValue(initialValues.firstName);
    expect(lastNameInput).toHaveValue(initialValues.lastName);
    expect(familyInput).toHaveProperty('checked', true);
  });

  test('ensure it resets the form when initialValues changes after submit', () => {
    const { getByText, getByLabelText, rerender } = render({
      initialValues: { isFamily: true }
    });

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const familyInput = getByLabelText(/family/i);

    // Triggers validation
    fireEvent.click(getByText(/save/i));

    expect(firstNameInput).toHaveClass('is-invalid');
    expect(lastNameInput).toHaveClass('is-invalid');
    expect(familyInput).toHaveProperty('checked', true);

    rerender(
      <UserForm initialValues={{ isFamily: false }} onSubmit={() => {}} />
    );

    expect(firstNameInput).not.toHaveClass('is-invalid');
    expect(lastNameInput).not.toHaveClass('is-invalid');
    expect(familyInput).toHaveProperty('checked', false);
  });

  test('ensure it resets the form when initialValues changes after blur', () => {
    const { getByLabelText, rerender } = render({
      initialValues: { isFamily: true }
    });

    const firstNameInput = getByLabelText(/first name/i);
    const lastNameInput = getByLabelText(/last name/i);
    const familyInput = getByLabelText(/family/i);

    // Triggers validation
    fireEvent.blur(firstNameInput);
    fireEvent.blur(lastNameInput);

    expect(firstNameInput).toHaveClass('is-invalid');
    expect(lastNameInput).toHaveClass('is-invalid');
    expect(familyInput).toHaveProperty('checked', true);

    rerender(
      <UserForm initialValues={{ isFamily: false }} onSubmit={() => {}} />
    );

    expect(firstNameInput).not.toHaveClass('is-invalid');
    expect(lastNameInput).not.toHaveClass('is-invalid');
    expect(familyInput).toHaveProperty('checked', false);
  });

  describe('submitting', () => {
    describe('and form is valid', () => {
      test('it calls on submit with formValues', () => {
        const formValues = {
          firstName: 'Jane',
          lastName: 'Doe',
          isFamily: true
        };
        const onSubmit = jest.fn();

        const { getByLabelText, getByText } = render({ onSubmit });

        const firstNameInput = getByLabelText(/first name/i);
        const lastNameInput = getByLabelText(/last name/i);
        const familyInput = getByLabelText(/family/i);
        const saveButton = getByText(/save/i);

        fireEvent.change(firstNameInput, {
          target: { value: formValues.firstName }
        });
        fireEvent.change(lastNameInput, {
          target: { value: formValues.lastName }
        });
        fireEvent.click(familyInput);

        fireEvent.click(saveButton);

        expect(onSubmit).toHaveBeenCalledWith(formValues);
      });
    });

    describe('and form is invalid', () => {
      describe('firstName', () => {
        describe('required', () => {
          test('it shows a validation message when empty after blur', async () => {
            const { getByLabelText, queryByTestId, getByTestId } = render();

            const firstNameInput = getByLabelText(/first name/i);

            expect(firstNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-first-name')).toBeNull();

            fireEvent.change(firstNameInput, { target: { value: '' } });
            fireEvent.blur(firstNameInput);

            const firstNameError = getByTestId(
              'validation-feedback-first-name'
            );
            expect(firstNameError).toHaveTextContent(/is required/i);
            expect(firstNameInput).toHaveClass('is-invalid');
          });

          test('it shows a validation message when empty after submit', async () => {
            const {
              getByLabelText,
              queryByTestId,
              getByText,
              getByTestId
            } = render();

            const firstNameInput = getByLabelText(/first name/i);
            const saveButton = getByText(/save/i);

            expect(firstNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-first-name')).toBeNull();

            fireEvent.change(firstNameInput, { target: { value: '' } });
            fireEvent.click(saveButton);

            const firstNameError = getByTestId(
              'validation-feedback-first-name'
            );
            expect(firstNameError).toHaveTextContent(/is required/i);
            expect(firstNameInput).toHaveClass('is-invalid');
          });
        });

        describe('maxlength = 30', () => {
          test('it shows a validation message when too long after blur', async () => {
            const { getByLabelText, queryByTestId, getByTestId } = render();

            const firstNameInput = getByLabelText(/first name/i);

            expect(firstNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-first-name')).toBeNull();

            fireEvent.change(firstNameInput, {
              target: { value: 'a'.repeat(31) }
            });
            fireEvent.blur(firstNameInput);

            const firstNameError = getByTestId(
              'validation-feedback-first-name'
            );
            expect(firstNameError).toHaveTextContent(
              /has a maximum length of 30/i
            );
            expect(firstNameInput).toHaveClass('is-invalid');
          });

          test('it shows a validation message when too long after submit', async () => {
            const {
              getByLabelText,
              queryByTestId,
              getByText,
              getByTestId
            } = render();

            const firstNameInput = getByLabelText(/first name/i);
            const saveButton = getByText(/save/i);

            expect(firstNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-first-name')).toBeNull();

            fireEvent.change(firstNameInput, {
              target: { value: 'a'.repeat(31) }
            });
            fireEvent.click(saveButton);

            const firstNameError = getByTestId(
              'validation-feedback-first-name'
            );
            expect(firstNameError).toHaveTextContent(
              /has a maximum length of 30/i
            );
            expect(firstNameInput).toHaveClass('is-invalid');
          });
        });
      });

      describe('lastName', () => {
        describe('required', () => {
          test('it shows a validation message when empty after blur', async () => {
            const { getByLabelText, queryByTestId, getByTestId } = render();

            const lastNameInput = getByLabelText(/last name/i);

            expect(lastNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-last-name')).toBeNull();

            fireEvent.change(lastNameInput, { target: { value: '' } });
            fireEvent.blur(lastNameInput);

            const lastNameError = getByTestId('validation-feedback-last-name');
            expect(lastNameError).toHaveTextContent(/is required/i);
            expect(lastNameInput).toHaveClass('is-invalid');
          });

          test('it shows a validation message when empty after submit', async () => {
            const {
              getByLabelText,
              queryByTestId,
              getByText,
              getByTestId
            } = render();

            const lastNameInput = getByLabelText(/last name/i);
            const saveButton = getByText(/save/i);

            expect(lastNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-last-name')).toBeNull();

            fireEvent.change(lastNameInput, { target: { value: '' } });
            fireEvent.click(saveButton);

            const lastNameError = getByTestId('validation-feedback-last-name');
            expect(lastNameError).toHaveTextContent(/is required/i);
            expect(lastNameInput).toHaveClass('is-invalid');
          });
        });

        describe('maxlength = 80', () => {
          test('it shows a validation message when too long after blur', async () => {
            const { getByLabelText, queryByTestId, getByTestId } = render();

            const lastNameInput = getByLabelText(/last name/i);

            expect(lastNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-last-name')).toBeNull();

            fireEvent.change(lastNameInput, {
              target: { value: 'a'.repeat(81) }
            });
            fireEvent.blur(lastNameInput);

            const lastNameError = getByTestId('validation-feedback-last-name');
            expect(lastNameError).toHaveTextContent(
              /has a maximum length of 80/i
            );
            expect(lastNameInput).toHaveClass('is-invalid');
          });

          test('it shows a validation message when too long after submit', async () => {
            const {
              getByLabelText,
              queryByTestId,
              getByText,
              getByTestId
            } = render();

            const lastNameInput = getByLabelText(/last name/i);
            const saveButton = getByText(/save/i);

            expect(lastNameInput).not.toHaveClass('is-invalid');
            expect(queryByTestId('validation-feedback-last-name')).toBeNull();

            fireEvent.change(lastNameInput, {
              target: { value: 'a'.repeat(81) }
            });
            fireEvent.click(saveButton);

            const lastNameError = getByTestId('validation-feedback-last-name');
            expect(lastNameError).toHaveTextContent(
              /has a maximum length of 80/i
            );
            expect(lastNameInput).toHaveClass('is-invalid');
          });
        });
      });

      test('guard it does not call onSubmit with values', () => {
        const onSubmit = jest.fn();

        const { getByText } = render({ onSubmit });

        fireEvent.click(getByText(/save/i));

        expect(onSubmit).not.toHaveBeenCalled();
      });
    });
  });
});
```

```jsx
import React, { useState, useEffect, useMemo } from 'react';
import { shape, string, func, bool } from 'prop-types';
import classNames from 'classnames';
import Button from '../../../components/button';

function UserForm({ initialValues, onSubmit }) {
  const [formValues, setFormValues] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // (Re)initialize form
  useEffect(() => {
    const newValues = {
      ...initialValues
    };

    setFormValues(newValues);
    setTouched({});
    setSubmitted(false);
  }, [initialValues]);

  // Validation
  const errors = useMemo(() => {
    const result = {};

    if (!formValues.firstName) result.firstName = 'is required';
    else if (formValues.firstName.length > 30)
      result.firstName = 'has a maximum length of 30';

    if (!formValues.lastName) result.lastName = 'is required';
    else if (formValues.lastName.length > 80)
      result.lastName = 'has a maximum length of 80';

    return result;
  }, [formValues]);

  const handleInputChange = evt => {
    const { target } = evt;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setFormValues({
      ...formValues,
      [target.name]: value
    });
  };

  const handleInputBlur = evt => {
    const {
      target: { name }
    } = evt;
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true
      });
    }
  };

  const handleSubmit = evt => {
    setSubmitted(true);
    if (Object.keys(errors).length === 0) onSubmit(formValues);
    evt.preventDefault();
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="firstName">
          First Name
        </label>
        <div className="col-sm-10">
          <input
            className={classNames('form-control', {
              'is-invalid': errors.firstName && (submitted || touched.firstName)
            })}
            id="firstName"
            maxLength={30}
            name="firstName"
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            placeholder="Enter First Name"
            required
            type="text"
            value={formValues.firstName || ''}
          />
          {errors.firstName && (submitted || touched.firstName) && (
            <div
              className="invalid-feedback"
              data-testid="validation-feedback-first-name"
            >
              {errors.firstName}
            </div>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor="lastName">
          Last Name
        </label>
        <div className="col-sm-10">
          <input
            className={classNames('form-control', {
              'is-invalid': errors.lastName && (submitted || touched.lastName)
            })}
            id="lastName"
            name="lastName"
            onBlur={handleInputBlur}
            onChange={handleInputChange}
            placeholder="Enter Last Name"
            required
            maxLength={80}
            type="text"
            value={formValues.lastName || ''}
          />
          {errors.lastName && (submitted || touched.lastName) && (
            <div
              className="invalid-feedback"
              data-testid="validation-feedback-last-name"
            >
              {errors.lastName}
            </div>
          )}
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 form-check-label" htmlFor="isFamily">
          Family
        </label>
        <div className="col-sm-10">
          <div className="form-check">
            <input
              checked={Boolean(formValues.isFamily)}
              className="form-check-input"
              id="isFamily"
              name="isFamily"
              onChange={handleInputChange}
              type="checkbox"
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

UserForm.propTypes = {
  initialValues: shape({
    firstName: string,
    lastName: string,
    isFamily: bool
  }),
  onSubmit: func
};

UserForm.defaultProps = {
  initialValues: {},
  onSubmit: () => {}
};

export default UserForm;
```

---

### Exercise 3 - UserDetail route/module (optional)

```jsx
// src/js/app.spec.jsx

// Mock the new module
jest.mock(
  //
  './modules/users-detail/user-detail.jsx',
  () => jest.fn().mockReturnValue(<div data-testid="UserDetailModuleMock" />)
);

// Add the following tests
describe('/users/new', () => {
  test('it renders the user detail module when authenticated', () => {
    const { getByTestId, queryByTestId } = renderWithRouter(
      <App initialIdentity="someone" />,
      {
        route: '/users/new'
      }
    );

    getByTestId('UserDetailModuleMock');

    expect(queryByTestId('UsersModuleMock')).toBeNull();
  });

  test('ensure it redirects to login when anonymous', () => {
    const { history } = renderWithRouter(<App />, {
      route: '/users/new'
    });

    expect(history).toHaveProperty('location.pathname', '/login');
    expect(history).toHaveProperty(
      'location.state.from.pathname',
      '/users/new'
    );
  });
});
```

```jsx
// src/js/app.jsx
import UserDetail from './modules/users-detail/user-detail';

<ProtectedRoute path="/users/new" component={UserDetail} />;
```

```jsx
// src/js/modules/users-detail/user-detail.spec.jsx

/* eslint-disable react/prop-types */

import React from 'react';
import { fireEvent, waitForDomChange } from '@testing-library/react';
import UserDetail from './user-detail';

import { save as saveMock } from '../../api/users';
import { renderWithRouter } from '../../../../test/react-testing-helpers';

jest.mock('./components/user-form.jsx', () => ({ onSubmit }) => {
  const handleClick = () => {
    onSubmit({ firstName: 'John', lastName: 'Doe', isFamily: true });
  };

  return (
    <div data-testid="UserFormMock">
      <button type="button" onClick={handleClick}>
        FakeSubmit
      </button>
    </div>
  );
});

jest.mock('../../api/users.js');

describe('User Detail', () => {
  beforeEach(() => {
    saveMock.mockResolvedValue({ id: 10 });
  });

  describe('when creating a new user', () => {
    function render() {
      return renderWithRouter(<UserDetail />);
    }

    it('it renders a header', () => {
      const { getByRole } = render();

      expect(getByRole('heading')).toHaveTextContent(/user detail/i);
    });

    it('it renders the user form', () => {
      const { getByTestId } = render();

      getByTestId('UserFormMock');
    });

    test('it stores the new user and redirects to /users', async () => {
      const { getByText, history } = render();

      fireEvent.click(getByText('FakeSubmit'));

      expect(saveMock).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        isFamily: true
      });

      await waitForDomChange();

      expect(history).toHaveProperty('location.pathname', '/users');
    });
  });
});
```

```jsx
// src/js/modules/users-detail/user-detail.jsx
import React, { useCallback, useState } from 'react';
import { Redirect } from 'react-router';

import UserForm from './components/user-form';
import * as UserApi from '../../api/users';

function UserDetail() {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = useCallback(async values => {
    await UserApi.save(values);
    setRedirect(true);
  }, []);

  if (redirect) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="container-fluid">
      <h1>User Detail</h1>
      <br />
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}

export default UserDetail;
```
