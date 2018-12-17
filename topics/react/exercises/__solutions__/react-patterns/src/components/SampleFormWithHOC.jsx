import React, { Fragment } from 'react';

import DisplayProps from './DisplayProps';

const SampleForm = ({ values, touched, handleBlur, handleChange, handleSubmit }) => (
  <Fragment>
    <h2>Sample Form (With HOC)</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
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
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <button className="btn btn-default" type="submit">
        Submit
      </button>
    </form>
    <DisplayProps values={values} touched={touched} />
  </Fragment>
);

function withForm(config) {
  return (WrappedComponent) =>
    class HOC extends React.Component {
      state = { values: config.initialValues, touched: {} };

      handleSubmit = (evt) => {
        evt.preventDefault();
        config.onSubmit(this.state.values);
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
        return (
          <WrappedComponent
            {...this.props}
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            handleBlur={this.handleBlur}
            values={this.state.values}
            touched={this.state.touched}
          />
        );
      }
    };
}

export default withForm({
  initialValues: { name: '', email: '' },
  onSubmit: (values) => {
    console.log('onSubmit', values);
  },
})(SampleForm);
