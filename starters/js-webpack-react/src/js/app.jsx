import React from 'react';
import { hot } from 'react-hot-loader/root';
import jsImage from '../favicon.png';

export const App = () => (
  <h1>
    <img src={jsImage} alt="javascript" />
    <span>Hello from ES2015+</span>
  </h1>
);

export default hot(App);
