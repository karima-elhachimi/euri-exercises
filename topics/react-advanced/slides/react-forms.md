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
- You can then get their value using a [<code>Ref</code>](https://reactjs.org/docs/refs-and-the-dom.html)
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

#### Form - <code>onSubmit</code>

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

#### Input - <code>useRef</code>

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

#### Input - <code>defaultValue</code>

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

💡<code>&lt;textarea /&gt;</code> and <code>&lt;select /&gt;</code> works accordingly.

---//

#### Input - <code>radio</code> & <code>checkbox</code>

- get the value by using the <code>checked</code> property of the ref
- set the default value by using <code>defaultChecked</code> property

```jsx
const isFriendRef = useRef();

const handleSubmit = evt => {
  evt.preventDefault();
  console.log({
    friend: isFriendRef.current.checked
  });
};
```

```html
<label htmlFor="friend">Is Friend</label>
<input id="friend" type="checkbox" defaultChecked ref="{isFriendRef}" />
```

---//

#### Exercise 1 - Create the login form

Complete the login module to generate the following html (component design is up to you):

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

- <code>&lt;input type="text" /&gt; </code>, <code>&lt;select /&gt;</code> and <code>&lt;textarea /&gt;</code> use <code>value</code> property and <code>evt.target.value</code> in callback
- <code>&lt;input type="checkbox" /&gt; </code> and <code>&lt;input type="radio" /&gt; </code> use <code>checked</code> property and <code>evt.target.checked</code> in callback

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

Create a <code>&lt;UserForm /&gt;</code> control that could be used to create or edit users

```html
<form novalidate="">
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
  - use <code>getByLabelText</code> to get to the input
  - verify value (empty)
  - verify placeholder
- verify the lastName input
- verify the family checkbox

---//

#### Exercise 2.2 <code>onSubmit</code>

Adjust the component to call the property <code>onSubmit</code> with formValues when the form is submitted (Save Clicked)

- verify the value of <code>firstName</code>
- verify the value of <code>lastName</code>
- verify the value of family input as the property <code>isFamily</code> in the formValues

---//

#### Exercise 2.3 firstName Validation

- Add required and maxlength=30 attributes to firstName form-group
- <code>onSubmit</code> should not be called when firstName is empty or longer than 30 chars
- Verify the validation feedback in both cases
- Verify the class on the input (is-invalid) in both case

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

💡Hints

<!-- .element: class="fragment" data-fragment-index="1" -->

- use the <code>onBlur</code> event to mark the field as touched

<!-- .element: class="fragment" data-fragment-index="1" -->

---//

#### Exercise 2.5 LastName validation

- The input is required
- The length of the input is limited to 80 chars
- It should behave as the firstName validation

---//

#### Exercise 2.6 <code>initialValues</code>

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
