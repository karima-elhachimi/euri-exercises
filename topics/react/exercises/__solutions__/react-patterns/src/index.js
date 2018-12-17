import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import App from './App';
import ErrorBoundery from './components/ErrorBoundery';

ReactDOM.render(
  <ErrorBoundery>
    <App />
  </ErrorBoundery>,
  document.getElementById('root'),
);
