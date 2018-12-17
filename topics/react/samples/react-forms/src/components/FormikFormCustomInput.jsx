import React, { Component } from 'react';
import { Formik, Form } from 'formik';

import * as yup from 'yup';

import PrettyJson from './PrettyJson';
import TextInput from './forms/TextInput';
import MultiSelect from './forms/MultiSelect';

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

const options = [
  { value: 'Food', label: 'Food' },
  { value: 'Beer', label: 'Beer' },
  { value: 'Code', label: 'Code' },
  { value: 'Kittens', label: 'Kittens' },
];

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
            active: false,
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
          render={({
            values,
            handleChange,
            handleBlur,
            handleReset,
            setFieldValue,
            setFieldTouched,
            errors,
            dirty,
            touched,
            isSubmitting,
          }) => (
            <Form noValidate>
              <TextInput
                id="name"
                type="text"
                label="Name"
                placeholder="Enter your name"
                error={touched.name && errors.name}
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextInput
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                error={touched.email && errors.email}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <MultiSelect
                id="like"
                label="Like"
                options={options}
                value={values.like}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={touched.like && errors.like}
              />
              <label style={{ display: 'block', fontWeight: 'bold' }}>
                <input
                  type="checkbox"
                  name="active"
                  checked={values.active}
                  onChange={handleChange}
                />
                Active user
              </label>
              <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <PrettyJson data={{ errors, touched, isSubmitting, dirty }} />
            </Form>
          )}
        />
      </div>
    );
  }
}
