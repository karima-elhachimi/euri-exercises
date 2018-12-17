import React, { Component } from 'react';

import Button from './components/Button';
import SampleForm from './components/SampleForm';
import { StoreProvider } from './components/StoreProvider';
import { Green, Red } from './components/RedGreenBlue';

class App extends Component {
  handleClick = (evt) => {
    console.log('click', evt);
  };

  render() {
    return (
      <div className="container">
        <h1>My App</h1>
        <h3>Buttons</h3>
        <div className="btn-toolbar">
          <Button onClick={this.handleClick}>Default</Button>
          <Button primary onClick={this.handleClick}>
            Primary
          </Button>
          <Button danger onClick={this.handleClick}>
            Don't click me
          </Button>
        </div>
        <hr />
        <SampleForm />
        <hr />
        <h3>Context</h3>
        <StoreProvider initialValue={10}>
          <Green />
          <Red />
        </StoreProvider>
      </div>
    );
  }
}

// hot export to enable hot reloading of react components
export default App;
