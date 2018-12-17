import React, { Component } from 'react';

import TextToggler from './components/TextToggler';
import Alert from './components/Alert';

class App extends Component {
  state = {
    showAlert: true,
  };

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    const { showAlert } = this.state;
    return (
      <div className="container">
        <h1>Text Toggler</h1>
        <TextToggler />
        <h1>Alert Component</h1>
        <Alert>This is an information message</Alert>
        <Alert type="danger">We have a problem</Alert>
        {showAlert && (
          <Alert type="warning" onClose={this.closeAlert}>
            <strong>Warning!</strong> Better check yourself, you are not looking
            too good.
          </Alert>
        )}
      </div>
    );
  }
}

export default App;
