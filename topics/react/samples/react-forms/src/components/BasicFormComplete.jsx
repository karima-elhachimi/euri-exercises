import React, { Component } from 'react';

import PrettyJson from './PrettyJson';

export default class BasicFormComplete extends Component {
  state = {
    values: {},
    errors: {},
  };

  handleSubmit = e => {
    const { errors, values } = this.state;
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      console.table(values);
    }
  };

  handleChange = e => {
    const { values } = this.state;
    this.setState({
      values: {
        ...values,
        [e.target.name]: e.target.value,
      },
    });

    // validate email
    if (e.target.name === 'name') {
      if (!e.target.value) {
        this.setState(state => ({
          errors: { ...state.errors, name: 'required' },
        }));
      }
    }
  };

  // handle blur
  handleBlur = e => {
    e.persist();
    this.setState(state => ({
      touched: {
        ...state.touched,
        [e.target.name]: true,
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
              onBlur={this.handleBlur}
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
              onBlur={this.handleBlur}
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
