import React, { Component } from 'react';
import { Formik } from 'formik';

import PrettyJson from './PrettyJson';

// eslint-disable-next-line react/prefer-stateless-function
export default class SimpleForm extends Component {
  render() {
    return (
      <div>
        <h2>Formik Form</h2>
        <Formik
          initialValues={{
            name: 'unknown',
            email: '',
          }}
          onSubmit={values => {
            console.log('submit', values);
          }}
          render={({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            touched,
          }) => (
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" style={{ display: 'block' }}>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-input"
                  value={values.name}
                />
              </label>
              <label htmlFor="email" style={{ display: 'block' }}>
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-input"
                />
              </label>
              <button type="submit">Submit</button>
              <PrettyJson data={{ values, touched }} />
            </form>
          )}
        />
      </div>
    );
  }
}
