import React, { Component } from 'react';
import { connect } from 'react-redux';

class SideBar extends Component {
  render() {
    return (
      <div>
        <h3>SideBar</h3>
        {this.props.counter}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(SideBar);
