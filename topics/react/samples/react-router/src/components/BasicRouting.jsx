import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Topic = ({ match }) => {
  console.log(match);
  return <h3>topics: {match.params.topicId}</h3>;
};

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>Rendering with react</Link>
      </li>
      <li>
        <Link to={`${match.url}/component`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props`}>Props v state</Link>
      </li>
    </ul>

    <Route path="/topics/:topicId" component={Topic} />
    <Route
      exact
      path={match.utl}
      render={() => <h3>Please select a topic</h3>}
    />
  </div>
);

export default class Simple extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    );
  }
}
