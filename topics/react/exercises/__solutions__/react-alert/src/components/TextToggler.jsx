import React, { Component } from 'react';
import classNames from 'classnames';

class TextToggler extends Component {
  state = {
    showText: true,
  };

  toggleText = () => {
    const { showText } = this.state;
    this.setState({ showText: !showText });
  };

  render() {
    const { showText } = this.state;
    const classes = classNames({ hidden: !showText });
    return (
      <div>
        <button
          className="btn btn-default"
          onClick={this.toggleText}
          type="button"
        >
          Toggle text
        </button>

        {/* logical and operator */}
        {showText && <p>This is some text</p>}

        {/* set hidden property */}
        <p hidden={!showText}>This is some other text</p>

        {/* set hidden class */}
        <p className={classes}>And finally, yet another</p>
      </div>
    );
  }
}

export default TextToggler;
