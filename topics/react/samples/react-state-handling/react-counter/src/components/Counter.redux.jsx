import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../store/actions';

class Counter extends Component {
  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Redux Counter</h3>
        {this.props.counter}
        <button onClick={this.props.actions.increment}>+</button>
        <button onClick={this.props.actions.decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
