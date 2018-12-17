import React, { Component } from 'react';
import './App.css';

import Counter from './components/Counter';
// import Counter from './components/Counter.dispatch';
// import Counter from './components/Counter.redux';
// import Counter from './components/Counter.mobx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>React State Handing</h2>
        <Counter />
      </div>
    );
  }
}

export default App;
