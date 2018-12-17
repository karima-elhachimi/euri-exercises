import React, { Fragment } from 'react';
import { Formik } from 'formik';

import DisplayProps from './DisplayProps';

const SampleForm = () => (
  <Fragment>
    <h2>Sample Form (With HOC)</h2>
    <Formik
      initialValues={{ name: '', email: '' }}
      onSubmit={({ values }) => {
        console.log('onSubmit', values);
      }}
      render={({ values, touched, handleChange, handleBlur, handleSubmit }) => (
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
          <DisplayProps values={values} touched={touched} />
        </form>
      )}
    />
  </Fragment>
);

export default SampleForm;
