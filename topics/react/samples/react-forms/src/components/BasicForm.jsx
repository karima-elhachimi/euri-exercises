import React, { Component } from 'react';

import PrettyJson from './PrettyJson';

export default class SimpleForm extends Component {
  state = {
    values: {},
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('Submit: ', this.state);
  };

  handleChange = event => {
    event.persist();
    this.setState(state => ({
      values: {
        ...state.values,
        [event.target.name]: event.target.value,
      },
    }));
  };

  render() {
    return (
      <div>
        <h2>Simple Form</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name" style={{ display: 'block' }}>
            Name
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={this.handleChange}
              className="text-input"
            />
          </label>
          <label htmlFor="email" style={{ display: 'block' }}>
            Email
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              onChange={this.handleChange}
              className="text-input"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <PrettyJson label="state" data={this.state} />
      </div>
    );
  }
}
