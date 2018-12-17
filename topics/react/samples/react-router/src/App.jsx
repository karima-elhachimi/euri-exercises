import React, { Component } from 'react';
import './App.css';

import BasicRouting from './components/BasicRouting';
// import AuthRoute from './components/AuthRoute';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Router Sample</h1>
        <BasicRouting />
        {/* <AuthRoute /> */}
      </div>
    );
  }
}

export default App;
