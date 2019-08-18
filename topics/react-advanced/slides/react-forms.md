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
