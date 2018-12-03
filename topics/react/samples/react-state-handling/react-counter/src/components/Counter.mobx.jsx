import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@observer // make component rerender to state changes
class Counter extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Mobx Counter</h3>
        {this.props.store.counter}
        <button onClick={this.props.store.increment}>+</button>
        <button onClick={this.props.store.decrement}>-</button>
      </div>
    );
  }
}

export default inject('store')(Counter);
