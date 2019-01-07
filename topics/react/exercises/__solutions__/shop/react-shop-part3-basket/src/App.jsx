import React, { Component } from 'react';
import eventBus from 'pubsub-js';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Header from './components/Header';
import HomeContainer from './containers/HomeContainer';
import ProductTableContainer from './containers/ProductTableContainer';
import ProductEditContainer from './containers/ProductEditContainer';

class App extends Component {
  constructor(props) {
    super(props);

    eventBus.subscribe('error', (msg, data) => {
      console.log('ERROR', msg, data);
      toast.error(data.message);
    });
  }

  render() {
    return (
      <div id="app" className="container">
        <Header />
        <Route path="/" exact component={HomeContainer} />
        <Route path="/admin" component={ProductTableContainer} />
        <Route path="/edit" exact component={ProductEditContainer} />
        <Route path="/edit/:id" exact component={ProductEditContainer} />
        <ToastContainer autoClose={5000} position="bottom-right" />
      </div>
    );
  }
}

export default App;
