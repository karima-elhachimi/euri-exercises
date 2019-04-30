import React from 'react';
import { hot } from 'react-hot-loader/root';
import jsImage from '../public/images/js-logo.png';

export function App() {
  return (
    <h1>
      <img src={jsImage} alt="javascript" height="100" />
      <span>Hello from ES2015+</span>
    </h1>
  );
}

export default hot(App);
