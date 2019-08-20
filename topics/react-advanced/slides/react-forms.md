---
title: React Forms
verticalSeparator: ---//
---

## React Forms

<img src="./images/forms.png" width="400px"/><br>

<small>
Copyright (c) 2018-2019 Euricom nv.
</small>

---

### 🤔 How to handle user input?

- Uncontrolled components (with refs)
- Controlled components (with onChange & setState)
- 3th Party Library (formik, informed, ...)

---

### Uncontrolled

- Uncontrolled inputs are like traditional HTML form inputs
- You can then get their value using a [`Ref`](https://reactjs.org/docs/refs-and-the-dom.html)
- You have to ‘pull’ the value from the field when you need it

---//

#### Getting started

```jsx
import React from 'react';

// We associate the label with the input (👍 accessibility)
function UncontrolledFormExample() {
  return (
    <form>
      <label htmlFor="firstName">First Name</label>
      <input id="firstName" type="text" />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---//

#### Form - `onSubmit`

```jsx
import React from 'react';

function UncontrolledFormExample() {
  const handleSubmit = evt => {
    // 💡Prevent navigation, which is standard form behavior
    evt.preventDefault();

    // 🤔How to get the value of the firstName input?
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---//

#### Input - `useRef`

```jsx
import React, { useRef } from 'react';

function UncontrolledFormExample() {
  const firstNameRef = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log({ firstName: firstNameRef.current.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input id="firstName" type="text" ref={firstNameRef} />
    </form>
  );
}
```

---//

#### Input - `defaultValue`

🤔What if you wanted to provide an initial value for the input?

<!-- prettier-ignore -->
```jsx
<input
  id="firstName"
  type="text"
  ref={firstNameRef}
  defaultValue="John"
/>
```

💡`<textarea />` and `<select />` works accordingly.

---//

#### Input - `radio` & `checkbox`

- get the value by using the `checked` property of the ref
- set the default value by using `defaultChecked` property

```jsx
const isFriendRef = useRef();

const handleSubmit = evt => {
  evt.preventDefault();
  console.log({
    friend: isFriendRef.current.checked
  });
};
```

<!-- prettier-ignore -->
```html
<label htmlFor="friend">Is Friend</label>
<input 
  id="friend"
  type="checkbox" defaultChecked ref="{isFriendRef}" />
```

---//

#### Exercise 1 - Create the login form

Complete the login module to match:

```html
<div class="container">
  <div class="row justify-content-center">
    <div class="card col-sm-6">
      <div class="card-body">
        <h4 class="card-title">Sign in</h4>
        <p class="text-danger text-center" role="alert">
          Unknown user or password
        </p>
        <form>
          <div class="form-group">
            <label for="username">Your username</label
            ><input
              class="form-control"
              placeholder="username"
              type="text"
              id="username"
            />
          </div>
          <div class="form-group">
            <label for="password">Your password</label
            ><input
              class="form-control"
              placeholder="******"
              type="password"
              id="password"
            />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
```

---//

#### Exercise 1 - Create the login form

- username is focussed by default (don't use autofocus)
- verify that password is of type password
- valid users: admin(🔑secret) and user(🔑pass)
- when invalid user, reset form display alert unknown user or password and set focus back to username

---

### Controlled

- React has taken control of the input
- The input value is stored in local state
- Data (state) and UI (inputs) are always in sync

> React state becomes the “single source of truth”.

---//

#### 🤔 How?

```jsx
import React, { useState } from 'react';

function ControlledFormExample() {
  //⚠️ The initialState has to be different
  // from null or undefined otherwise react would throw
  // a warning of uncontrolled ==> controlled
  const [firstName, setFirstName] = useState('');

  const handleSubmit = evt => {
    console.log({ firstName });
    evt.preventDefault();
  };

  const handleChange = evt => {
    console.log('change', { value: evt.target.value });
    setFirstName(evt.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        type="text"
        value={firstName}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

export default ControlledFormExample;
```

---//

#### Element summary overview

- `<input type="text" />`, `<select />` and `<textarea />` use `value` property and `evt.target.value` in callback
- `<input type="checkbox" />` and `<input type="radio" />` use `checked` and `evt.target.checked` in callback

---//

#### Handling multiple inputs

```jsx
function ControlledFormExample() {
  const [formValues, setFormValues] = useState({
    firstName: '',
    friend: false
  });

  const handleSubmit = evt => {
    console.log(formValues);
    evt.preventDefault();
  };

  const handleInputChange = evt => {
    const { target } = evt;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    //⚠️ Spread existing values,
    // a class component's this.setState()
    // would have done this automatically
    setFormValues({
      ...formValues,
      [target.name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        onChange={handleInputChange}
        type="text"
        value={formValues.firstName}
      />

      <label htmlFor="friend">Is Friend</label>
      <input
        checked={formValues.friend}
        id="friend"
        name="friend"
        onChange={handleInputChange}
        type="checkbox"
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

---//

#### Exercise 2

Create a `<UserForm />` control that could be used to create or edit users

```html
<form novalidate>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label" for="firstName">First Name</label>
    <div class="col-sm-10">
      <input
        class="form-control"
        id="firstName"
        placeholder="Enter First Name"
        type="text"
        value=""
      />
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 col-form-label" for="lastName">Last Name</label>
    <div class="col-sm-10">
      <input
        class="form-control"
        id="lastName"
        placeholder="Enter Last Name"
        type="text"
        value=""
      />
    </div>
  </div>
  <div class="form-group row">
    <label class="col-sm-2 form-check-label" for="isFamily">Family</label>
    <div class="col-sm-10">
      <div class="form-check">
        <input class="form-check-input" id="isFamily" type="checkbox" />
      </div>
    </div>
  </div>
  <div class="form-group">
    <button type="submit" class="btn btn-primary">Save</button>
  </div>
</form>
```

---//

#### Exercise 2.1 Getting Started

Create the component (module: users-detail)

- verify the firstName input
  - use `getByLabelText` to get to the input
  - verify value (empty)
  - verify placeholder
- verify the lastName input
- verify the family checkbox

---//

#### Exercise 2.2 `onSubmit`

Adjust the component to call the property `onSubmit` with formValues when the form is submitted (Save Clicked)

- verify the value of `firstName`
- verify the value of `lastName`
- verify the value of family input as the property `isFamily` in the formValues

---//

#### Exercise 2.3 firstName Validation

- Add required and maxlength=30 attributes
- `onSubmit` should not be called when firstName is invalid
- Verify the validation feedback and 'is-invalid' class

```html
<div class="form-group row">
  <label class="col-sm-2 col-form-label" for="firstName">First Name</label>
  <div class="col-sm-10">
    <input
      class="form-control is-invalid"
      id="firstName"
      maxlength="30"
      name="firstName"
      placeholder="Enter First Name"
      required=""
      type="text"
      value=""
    />
    <div class="invalid-feedback" data-testid="validation-feedback-first-name">
      is required
      <!–– has a maximum length of 30 ––>
    </div>
  </div>
</div>
```

---//

#### Exercise 2.4 Improve validation

- We only want to see the validation message after the user has submitted the form
- Or when the user has touched the input

💡Hint: use the [`onBlur`](https://reactjs.org/docs/events.html#focus-events) event to mark the field as touched

<!-- .element: class="fragment" data-fragment-index="1" -->

---//

#### Exercise 2.5 LastName validation

- The input is required
- The length of the input is limited to 80 chars
- It should behave as the firstName validation

---//

#### Exercise 2.6 `initialValues`

```jsx
<UserForm
  initialValues={{
    firstName: string,
    lastName: string,
    isFamily: boolean
  }}
/>
```

- initialValues is an optional prop
- verify inputs values to match initialValues
- updating initialValues resets the form, so all validation and touches are cleared

💡Hint: use `rerender` to update the component

<!-- .element: class="fragment" data-fragment-index="1" -->

---//

#### Exercise 3 UserDetail route/module (optional)

- create a protected route to our module /users/new
- when our `<UserForm />` submits we store the new user using our users api
- after saving we redirect to '/users'

---

### Formik

<img src="./images/formik.png" width="400px" style="border: 0px;background:#191919"/><br>

Build forms in React, without the tears 😭.

---//

#### Getting Started

We could extract our controlled form behavior into a `useForm` [custom hook](https://reactjs.org/docs/hooks-custom.html). But let's look at [Formik](https://github.com/jaredpalmer/formik)

- `formik`: Easy form library
- `yup`: Yup is a JavaScript object schema validator

```
npm i --save formik yup
```

---//

#### Formik - As hoc

A Higher-order Component (HoC) that accepts a configuration object

```jsx
const MyForm = ({ values, errors, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    ...
  </form>
);

withFormik({
  mapPropsToValues: {
      // ...
  },
  validate: {
      // ...
  }
  handleSubmit: {
      /// ...
  }
}(MyForm)
```

---//

#### Formik - As component

A React component with a render prop

```jsx
<Formik
    initialValues={{
      //...
    }}
    validate={values => {
      //...
    }}
    onSubmit={(
      //...
    )}
    render={({ values, errors, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
        </form>
    )}
/>
```

---//

#### Building a form

Start with a `<Formik />` component

```jsx
import React from 'react';
import { Formik } from 'formik';

function SimpleFormikForm() {
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      onSubmit={values => {
        console.log('submit', values);
      }}
      render={() => <form />}
    />
  );
}

export default SimpleFormikForm;
```

---//

#### Building a form

Add your input elements

```jsx
import React from 'react';
import { Formik } from 'formik';

function SimpleFormikForm() {
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      onSubmit={values => {
        console.log('submit', values);
      }}
      render={({ handleSubmit, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            onChange={handleChange}
            value={values.name}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    />
  );
}

export default SimpleFormikForm;
```

---//

#### Building a form

Simplify with [`Form`](https://jaredpalmer.com/formik/docs/api/form) and [`Field`](https://jaredpalmer.com/formik/docs/api/field) components

```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';

function SimpleFormikForm() {
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      onSubmit={values => {
        console.log('submit', values);
      }}
      render={() => (
        <Form>
          <Field name="name" type="test" />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  );
}

export default SimpleFormikForm;
```

---//

#### Building a form

Add validation

```js
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4)
    .required()
});

function SimpleFormikForm() {
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('submit', values);
      }}
      render={({ errors, touched }) => (
        <Form>
          <Field name="name" type="test" />
          {errors.name && touched.name && <div>{errors.name}</div>}
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  );
}

export default SimpleFormikForm;
```

---//

#### Building a form

Simplify even further with [`ErrorMessage`](https://jaredpalmer.com/formik/docs/api/errormessage) component

```jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4)
    .required()
});

function SimpleFormikForm() {
  return (
    <Formik
      initialValues={{
        name: ''
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log('submit', values);
      }}
      render={() => (
        <Form>
          <Field name="name" type="test" />
          <ErrorMessage name="name" />
          <button type="submit">Submit</button>
        </Form>
      )}
    />
  );
}

export default SimpleFormikForm;
```

---//

#### Exercise 4 - Convert `UserForm` to `Formik`

- create a copy of the spec and rename to -formik.spec.jsx
- create a copy of the component and rename to -formik.jsx
- change to a `formik` form
- try to make as less changes as possible to the spec

💡Hint: if you use `yup` the validation changes from `sync` to `async`!

---

### Resources

- [Building forms using React](https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y)

- [Should you store your form state in Redux?](https://goshakkk.name/should-i-put-form-state-into-redux/)

- Formik
  - [Better React Forms with Formik](https://mead.io/formik/)
  - [The Joy of Forms with React and Formik](https://keyholesoftware.com/2017/10/23/the-joy-of-forms-with-react-and-formik/)
  - [formik vs informed vs react form vs react forms](http://www.npmtrends.com/formik-vs-informed-vs-react-form-vs-react-forms)
  - [ReactNYC - Formik](https://www.youtube.com/watch?v=-tDy7ds0dag)
