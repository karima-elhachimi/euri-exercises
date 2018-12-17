import React, { Component } from 'react';
import { Formik, Field, Form } from 'formik';

/* eslint-disable */
import PrettyJson from './PrettyJson';

export default class SimpleForm extends Component {
  render() {
    return (
      <div>
        <h2>Formik Form - With Fields</h2>
        <Formik
          initialValues={{
            name: '',
            email: '',
          }}
          onSubmit={(values, actions) => {
            console.log('submit', values);
            // simulate async task
            setTimeout(() => {
              actions.setSubmitting(false);
              console.log('submit done');
            }, 2000);
          }}
          render={({ touched, isSubmitting }) => (
            <Form>
              <label htmlFor="name" style={{ display: 'block' }}>
                Name
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="text-input"
                />
              </label>
              <label htmlFor="email" style={{ display: 'block' }}>
                Email
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="text-input"
                />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <PrettyJson data={{ touched, isSubmitting }} />
            </Form>
          )}
        />
      </div>
    );
  }
}
