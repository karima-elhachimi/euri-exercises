import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';

import PrettyJson from './PrettyJson';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(4)
    .required(),
  email: yup
    .string()
    .email('Email not valid')
    .required('Is required'),
});

console.log('validationSchema', validationSchema);

// eslint-disable-next-line
export default class SimpleForm extends Component {
  render() {
    return (
      <div>
        <h2>Formik Form - With Fields & Validation</h2>
        <Formik
          initialValues={{
            name: 'new',
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log('submit', values);
            // simulate async task
            setTimeout(() => {
              actions.setSubmitting(false);
              console.log('submit done');
            }, 2000);
          }}
          render={({ errors, touched, isSubmitting }) => (
            <Form>
              <label htmlFor="name" style={{ display: 'block' }}>
                Name
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="text-input"
                />
                {errors.name && touched.name && <div>{errors.name}</div>}
              </label>
              <label htmlFor="email" style={{ display: 'block' }}>
                Email
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="text-input"
                />
                {errors.email && touched.email && <div>{errors.email}</div>}
              </label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <PrettyJson data={{ errors, touched, isSubmitting }} />
            </Form>
          )}
        />
      </div>
    );
  }
}
