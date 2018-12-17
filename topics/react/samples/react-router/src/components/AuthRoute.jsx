import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;
class Login extends Component {
  state = {
    redirectToReferrer: false,
  };
  login = () => {
    fakeAuth.authenticate(() => {
      console.log('auth');
      this.setState(() => ({ redirectToReferrer: true }));
    });
  };
  render() {
    console.log('this.props', this.props.location);
    const { redirectToReferrer } = this.state;
    const { from } = this.props.location.state || { from: { pathname: '/' } };

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <p>You must login to view this page at {from.pathname}</p>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}

// const PrivateRoute = ({ component: WrapperComponent, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated === true ? (
//         <WrapperComponent {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: '/login',
//             state: { from: props.location },
//           }}
//         />
//       )
//     }
//   />
// );

class AuthButtonInner extends Component {
  signout = () => {
    const { history } = this.props;
    fakeAuth.signout(() => history.push('/'));
  };

  render() {
    if (fakeAuth.isAuthenticated) {
      return (
        <p>
          Welcome <button onClick={this.signout}>Sign Out</button>
        </p>
      );
    }
    return <p>You are not logged in</p>;
  }
}

const AuthButton = withRouter(AuthButtonInner);

export default class LoginLogout extends Component {
  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          <ul>
            <li>
              <Link to="/public">Public page</Link>
            </li>
            <li>
              <Link to="/protected">Protected page</Link>
            </li>
          </ul>

          <Route path="/public" component={Public} />
          <Route path="/login" component={Login} />
          <Route
            path="/protected"
            render={props => {
              if (fakeAuth.isAuthenticated) {
                return <Protected {...props} />;
              }
              return (
                <Redirect
                  to={{ pathname: '/login', state: { from: props.location } }}
                />
              );
            }}
          />
          {/* <PrivateRoute path="/protected" component={Protected} /> */}
        </div>
      </Router>
    );
  }
}
