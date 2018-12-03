import React, { Component } from 'react';

import MyForm from './components/FormikFormCustomInput';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>Form Sample</h1>
        <MyForm />
      </div>
    );
  }
}

export default App;
