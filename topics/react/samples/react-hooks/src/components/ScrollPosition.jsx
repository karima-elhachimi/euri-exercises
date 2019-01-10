import React from 'react';

class ScrollPosition extends React.Component {
  constructor() {
    super();
    this.state = { position: 0 };
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updatePosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updatePosition);
  }

  updatePosition() {
    this.setState({ position: window.pageYOffset });
  }

  render() {
    return this.props.children(this.state.position);
  }
}

export default ScrollPosition;
