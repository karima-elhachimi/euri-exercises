import React, { Component } from 'react';

const withSecretToLife = (WrappedComponent) => {
  class HigherOrderComponent extends Component {
    render() {
      const msg = 'If it feels good, do it';
      return <WrappedComponent secretToLife={msg} {...this.props} />;
    }
  }
  return HigherOrderComponent;
};

export default withSecretToLife;
