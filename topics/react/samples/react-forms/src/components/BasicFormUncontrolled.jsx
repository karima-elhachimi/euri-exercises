import React, { Component } from 'react';

export default class BasiceFormUncontrolled extends Component {
  state = {
    // there is no state
  };

  handleSubmit = e => {
    e.preventDefault();
    const result = { name: this.nameInput.value, email: this.nameEmail.value };
    console.log('Submit: ', result);
  };

  render() {
    return (
      <div>
        <h2>Simple Form - Uncontrolled</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name" style={{ display: 'block' }}>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="text-input"
              ref={input => (this.nameInput = input)}
            />
          </label>
          <label htmlFor="email" style={{ display: 'block' }}>
            Email
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="text-input"
              ref={input => (this.nameEmail = input)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
