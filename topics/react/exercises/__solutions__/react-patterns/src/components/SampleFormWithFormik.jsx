import React, { Fragment } from 'react';
import { withFormik } from 'formik';

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

export default withFormik({
  mapPropsToValues: () => ({ name: '', email: '' }),
  handleSubmit: (values) => {
    console.log('onSubmit', values);
  },
})(SampleForm);
