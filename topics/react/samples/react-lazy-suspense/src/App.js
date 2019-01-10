import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// import Home from "./Home/Home";
// import Maps from "./Maps/Maps";
// import Blog from "./Blog/Blog";

import NotFound from "./NotFound/NotFound";
import "./App.css";

// use these i.s.o import above
const Home = React.lazy(() => import("./Home/Home"));
const Blog = React.lazy(() => import("./Blog/Blog"));
const Maps = React.lazy(() => import("./Maps/Maps"));

const WaitingComponent = Component => {
  return props => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <header className="header">
            <nav className="navbar container">
              <div className="navbar-brand">
                <Link to="/">
                  <span className="navbar-item">Lazy Loading Routes</span>
                </Link>
              </div>

              <div className="navbar-end">
                <Link to="/maps">
                  <span className="navbar-item">Maps</span>
                </Link>
                <Link to="/blog">
                  <span className="navbar-item">Blog</span>
                </Link>
              </div>
            </nav>
          </header>

          <section className="content">
            <Switch>
              <Route exact path="/" component={WaitingComponent(Home)} />
              <Route path="/maps" component={WaitingComponent(Maps)} />
              <Route path="/blog" component={WaitingComponent(Blog)} />
              <Route path="*" component={NotFound} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
