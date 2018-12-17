import React, { Component } from 'react';

import DisplayProps from './DisplayProps';

class SampleForm extends Component {
  state = {
    values: {
      name: '',
      email: '',
    },
    touched: {},
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    console.log('onSubmit', this.state.values);
  };

  handleChange = (evt) => {
    this.setState({
      values: {
        ...this.state.values,
        [evt.target.name]: evt.target.value,
      },
    });
  };

  handleBlur = (evt) => {
    this.setState({
      touched: {
        ...this.state.touched,
        [evt.target.name]: true,
      },
    });
  };

  render() {
    const { values } = this.state;
    return (
      <React.Fragment>
        <h2>Sample Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter your name"
              value={values.name}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email address</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
        <DisplayProps {...this.state} />
      </React.Fragment>
    );
  }
}

export default SampleForm;
