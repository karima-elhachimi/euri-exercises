import React from 'react';
import { render } from 'react-dom';

// Redux imports
// import { Provider } from 'react-redux';
// import { devToolsEnhancer } from 'redux-devtools-extension';
// import { createStore } from 'redux';
// import reducer from './store/reducer';

// Mobx imports
// import { Provider } from 'mobx-react';
// import AppStore from './store/appstore';

import './index.css';
import App from './App';

render(<App />, document.getElementById('root'));

// Mobx
// const store = new AppStore();
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );

// Redux
// const store = createStore(reducer, devToolsEnhancer());
// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );
