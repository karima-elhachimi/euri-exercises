import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import './App.css';
import Todos from './components/Todos';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="App">
        <Todos />
      </div>
    );
  }
}

// hot export to enable hot reloading of react components
// export default App;
export default hot(module)(App);
