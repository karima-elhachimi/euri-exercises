import React from 'react';
import { hot } from 'react-hot-loader/root';
import jsImage from '../public/images/js-logo.png';

export function App() {
  return (
    <>
      <h1>
        <img src={jsImage} alt="JS Logo" height="100" />
        <span data-testid="welcome-message">Hello from ES2015+</span>
      </h1>
      <div className="main container-fluid" />
    </>
  );
}

export default hot(App);
