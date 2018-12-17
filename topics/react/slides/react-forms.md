---
title: React Introduction
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# React Forms

<img src="./images/forms.png" width="600px" /><br>

<small>
by Peter Cosemans<br>
Copyright (c) 2018 Euricom nv.
</small>

<!-- markdownlint-disable -->
<br>
<style type="text/css">
.reveal section img {
    background:none;
    border:none;
    box-shadow:none;
}
.reveal h1 {
    font-size: 3.0em;
}
.reveal h2 {
    font-size: 2.00em;
}
.reveal h3 {
    font-size: 1.00em;
}
.reveal p {
    font-size: 70%;
}
.reveal blockquote {
    font-size: 100%;
}
.reveal tr {
    font-size: 60%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 100%;
}
</style>

---

# Forms

> Can you fill this in?

<!-- prettier-ignore -->
***

## Handle form input

> There is no conventional approach in React of doing this

- Uncontrolled components (with refs)
- Controlled components (with onChange & setState)
- Library (like formik, informed, redux-form or other)

<!-- prettier-ignore -->
***

## Uncontrolled

- Uncontrolled inputs are like traditional HTML form inputs
- You can then get the value using a ref
- You have to ‘pull’ the value from the field when you need it

> For simple forms

<!-- prettier-ignore -->
***

### Uncontrolled

<!-- prettier-ignore -->
```jsx
export default class MyComponent extends Component {

  handleSubmit = evt => {
    evt.preventDefault();
    console.log('handleSubmit', this.name.value);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                 ref={input => this.name = input} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
```

<!-- prettier-ignore -->
***

## Controlled

- React is taken control of the input
- The input value is stored in local state
- Data (state) and UI (inputs) are always in sync

<br>
###### More control for:

- Instant field validation
- Conditionally disabling submit button
- Enforcing input format

<!-- prettier-ignore -->
***

### Controlled

<!-- prettier-ignore -->
```jsx
export default class MyComponent extends Component {
  state = { values: {} }

  handleSubmit = evt => {
    // ...
  };

  handleChange = evt => {
    // ...
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" value={this.state.name}
               onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
```

<!-- prettier-ignore -->
***

### Controlled

```jsx
export default class MyComponent extends Component {
    handleSubmit = evt => {
        evt.preventDefault();
        console.log('handleSubmit', this.state.values);
    };

    handleChange = (evt) => {
      this.setState((state) => ({
        values: {
          ...state.values,
          [evt.target.name]: evt.target.value,
        },
      }));
    };

    render() {
        // ...
    }
}
```

<!-- prettier-ignore -->
***

### Controlled

Element summary overview

| Element                     | Value Property         | Value in callback    |
| --------------------------- | ---------------------- | -------------------- |
| `<input type="text" />`     | `value={string}`       | `evt.target.value`   |
| `<input type="checkbox" />` | `checked={boolean}`    | `evt.target.checked` |
| `<input type="radio" />`    | `checked={boolean}`    | `evt.target.checked` |
| `<textarea />`              | `value={string}`       | `evt.target.value`   |
| `<select />`                | `value={option value}` | `evt.target.value`   |

---

# Formik

> Build forms in React, without the tears

<!-- prettier-ignore -->
***

## Formik

Can handle:

- Input validation and error message
- Handling form submission
- Handle submit errors
- Simplify state handling
- Implemented as HOC or render props.

> Making testing, refactoring, and reasoning about your forms a breeze.

<!-- prettier-ignore -->
***

## Formik

A Higher-order Component (HoC) that accepts a configuration object

```js
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

<!-- prettier-ignore -->
***

## Formik

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
            <!-- ... -->
        </form>
    )}
    />
```

<!-- prettier-ignore -->
***

## Building a Form

Install dependencies

```
yarn add formik yup
```

- `formik`: Easy form library
- `yup`: Yup is a JavaScript object schema validator

<!-- prettier-ignore -->
***

### Building a Form

Start with a Formik component

```jsx
import React, { Component } from 'react';
import { Formik } from 'formik';

class SimpleForm extends Component {
  render() {
    return (
      <Formik
        initialValues={{
          name: '',
        }}
        onSubmit={values => {
          console.log('submit', values);
        }}
        render={() => <form />}
      />
    );
  }
}
```

<!-- prettier-ignore -->
***

### Building a Form

Add your input elements

<!-- prettier-ignore -->
```jsx
<Formik
  onSubmit={values => {
    console.log('submit', values);
  }}

  render={({ handleSubmit, handleChange, values }) => (
    <form onSubmit={handleSubmit}>
      <input type="text"
             id="name"
             onChange={handleChange}
             value={values.name} />
      <button type="submit">Submit</button>
    </form>
  )}
/>
```

<!-- prettier-ignore -->
***

### Building a Form

Simplify with Field & Form component

<!-- prettier-ignore -->
```jsx
<Formik
  onSubmit={values => {
    console.log('submit', values);
  }}

  render={({ values }) => (
    <Form>
      <Field type="text" name="name" />
      <Field type="email" name="email" />
      <button type="submit">Submit</button>
    </Form>
  )}
/>
```

<!-- prettier-ignore -->
***

### Building a Form

Add validation

```js
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(4)
    .required(),
});
```

```html
<Formik validationSchema={validationSchema}
        render={({ errors, touched }) => (
            <Form>
                <Field type="text"name="name" />
                { errors.name && touched.name &&
                  <div>{errors.name}</div>
                }
            </Form>
        )
/>
```

---

# Resources

> Get the extra information

<!-- prettier-ignore -->
***

## Resources

Training

- [Building forms using React](https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y)

Info

- [Should you store your form state in Redux?](https://goshakkk.name/should-i-put-form-state-into-redux/)
- [Handling React Forms with Mobx Observables](https://blog.risingstack.com/handling-react-forms-with-mobx-observables/)
- [React form validation with MobX](https://medium.com/@KozhukharenkoN/react-form-validation-with-mobx-8ce00233ae27)

<!-- prettier-ignore -->
***

## Resources

Formik

- [Better React Forms with Formik](https://mead.io/formik/)
- [The Joy of Forms with React and Formik](https://keyholesoftware.com/2017/10/23/the-joy-of-forms-with-react-and-formik/)
- [formik vs informed vs react form vs react forms](http://www.npmtrends.com/formik-vs-informed-vs-react-form-vs-react-forms)
- [ReactNYC - Formik](https://www.youtube.com/watch?v=-tDy7ds0dag)

Components/libraries

- [React-Select](https://github.com/JedWatson/react-select)

---

# Get your user input
