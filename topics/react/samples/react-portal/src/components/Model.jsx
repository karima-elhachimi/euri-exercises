import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const ModalTrigger = ({ text, onOpen }) => {
  return (
    <button className="c-btn" onClick={onOpen}>
      {text}
    </button>
  );
};

const ModalContent = ({ onClose }) => {
  // return ReactDOM.createPortal(
  return (
    <aside className="c-modal-cover">
      <div className="c-modal">
        <button className="c-modal__close" onClick={onClose}>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40">
            <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <div className="c-modal__body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </div>
      </div>
    </aside>
    // , document.body,
  );
};

export default class Modal extends Component {
  state = { isOpen: false };

  onOpen = () => {
    console.log('onOpen');
    this.setState({ isOpen: true });
  };

  onClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const { triggerText } = this.props;
    return (
      <>
        <ModalTrigger text={triggerText} onOpen={this.onOpen} />
        {isOpen && <ModalContent onClose={this.onClose} />}
      </>
    );
  }
}
