---
title: Patterns in React
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# Patterns in React

<img src="./images/react-patterns.jpg" width="300px"/><br>

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

## Slides, Starter and Solutions

> https://github.com/mjrio/mjr-patterns-in-react

```bash
# Clone repo
git clone https://github.com/mjrio/mjr-patterns-in-react

# Open slides in presentation mode
npm install reveal-md -g
reveal-md slides.md

# Copy exercise starter
cp mjr-patterns-in-react/exercises/react c:/temp
```

---

## Agenda

React patterns you should know

- Props in Depth
- Higher Order Components
- Error Boundery
- Render Props
- Context
- Hooks (optionally)

All these patterns should help you abstract/share code

---

# Props In Depth

> Know your props

<!-- prettier-ignore -->
***

## Spreading props

```jsx
class App extends Component {
  const obj = { firstName="peter", lastName="jansens" }
  render() {
    return (
        <Greeting firstName={obj.firstName}
                  lastName={obj.lastName} />
        )
  }
}
```

with spreading props

```jsx
class App extends Component {
  const obj = { firstName="peter", lastName="jansens" }
  render() {
    return <Greeting {...obj} />;
  }
}
```

<!-- prettier-ignore -->
***

### Spreading props

passing props from parent

```jsx
const FancyButton = props => (
  <button className="FancyButton" {...props}>
    {props.children}
  </button>
);

<FancyButton title="save the user" onClick="handlClick">
  Save
</FancyButton>;
```

<!-- prettier-ignore -->
***

### Passing down props

```
const App = () => (
  <Layout
    title="I'm here to stay"
    language="JavaScript"
    name="Alex"
  />
);
```

```js
const Layout = ({ title, ...props }) => (
  <div>
    <h1>{title}</h1>
    <Details {...props} />
  </div>
);
```

```js
const Details = ({ name, language }) => (
  <p>
    {name} works with {language}
  </p>
);
```

<!-- prettier-ignore -->
***

## Children props

```js
const Panel = props => (
  <div className="panel">
    <h1>{props.title}</h1>
    <div>{props.children}</div>
  </div>
);
```

```js
const App = () => (
  <Panel title="Hello world">
    <p>Lorem ipsum dolor sit amet</p>
    <strong>Finibus Bonorum</strong>
  </Panel>
);
```

<!-- prettier-ignore -->
***

## Props as function

```jsx
const MyComponent = props => (
  <Fragment>
    <p>{name}</p>
    <button disabled={!props.isActive(props.name)}>
      Close
    </button>
  </Fragment>
);
```

```jsx
class App extends Component {
  isActive = (name) => {
    return (name === 'default')
  }
  render() {
    return (
      <MyComponent name="default" isActive={this.isActive} />
      <MyComponent name="primary" isActive={this.isActive} />
    )
  }
}


```

<!-- prettier-ignore -->
***

## Validating

```jsx
import PropTypes from 'prop-types';

function MyComponent(props) {
  return (
    <h3>{props.title}<h3>
    <p>{props.count * 100}</p>
  );
}

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

MyComponent.defaultProps = {
  count: 10
};
```

[React prop-types](https://github.com/facebook/prop-types)

<!-- prettier-ignore -->
***

### Validating

Validate with static members

```jsx
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
  };
  static defaultProps = {
    count: 10
  };
  render() {
    const { title, count } = this.props;
    return (
       <h3>{title}<h3>
       <p>{count * 100}</p>
    );
  }
}
```

Static members requires babel-preset-stage-2

<!-- prettier-ignore -->
***

### Props in Initial State

```js
import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      someValue: props.someValue,
    };
  }
}
```

When you change the props next time, the state won’t be updated

```
componentWillReceiveProps(nextProps){
  if (nextProps.someValue !== this.props.someValue) {
    this.setState({ someValue: nextProps.someValue })
  }
}
```

<!-- prettier-ignore -->
***

## Exercise

Create a Button component with specific style

<!-- prettier-ignore -->
```html
<!-- bootstrap default button; class="btn btn-default" -->
<Button>Default</Button>

<!-- bootstrap primary button; class="btn btn-primary" -->
<Button primary>Primary</Button>

<!-- bootstrap danger button; class="btn btn-danger" -->
<Button danger>Don't click me</Button>
```

<img src="./images/buttons.png "/>

Optionally you can add validation

---

# Higher-Order Components

> A higher-order component is a function that takes a component and returns a new component.

<!-- prettier-ignore -->
***

### Simple Component

```jsx
import React from 'react';

const SimpleComponent = props => {
  return <p>SecretToLife: {props.secretToLife}</p>;
};

export default SimpleComponent;
```

<!-- prettier-ignore -->
***

### Higher-Order Component (HOC)

A sample

<!-- prettier-ignore -->
```jsx
import React from 'react';

const withSecretToLife = (WrappedComponent) => {
  const HigherOrderComponent = props => {
      const msg = 'If it feels good, do it';
      return (
        <WrappedComponent secretToLife={msg} {...props} />
      );
    }
  }
  return HigherOrderComponent;
};
export default withSecretToLife;
```

<!-- prettier-ignore -->
***

### Using HOC

<!-- prettier-ignore -->
```js
import React from 'react';
import withSecretToLife from './withSecretToLife';

const App = props => (
  <div>
    Hi {props.name}, the secret to life is {props.secretToLife}.
  </div>
)

export default withSecretToLife(App);
```

And use as a normal app component

```js
import App from './app.js';
render(<App name="peter" />, element);
```

<!-- prettier-ignore -->
***

### Class based HOC

<!-- prettier-ignore -->
```jsx
import React from 'react';

const withSecretToLife = (WrappedComponent) => {
  return class HOC extends Component {
    constructor(props) {
      super(props)
      this.msg = 'If it feels good, do it';
    }
    render() {
      return (
        <WrappedComponent secretToLife={this.msg}
                          {...this.props} />
      );
    }
  }
};

export default withSecretToLife;
```

[More Samples](https://medium.com/dailyjs/react-composing-higher-order-components-hocs-3a5288e78f55)

<!-- prettier-ignore -->
***

## Exercise

Create a HOC to logs all props to the console on every render of the WrappedComponent.

```js
const Button = () => (
  ...
)
export default withLogger(Button);
```

Optional: make if configurable

```js
export default withLogger('prefix')(Button);
```

<!-- prettier-ignore -->
***

## Exercise 2

Create a HOC to handle forms (see SampleForm)

```js
// prettier-ignore
const SampleForm = ({values, handleBlur, handleChange, handleSubmit}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <input type="text" name="name" value={values.name}
             onChange={handleChange} onBlur={handleBlur} />
    </div>
    <button className="btn btn-default" type="submit">Submit</button>
  </form>
);
```

```js
export default withForm({
  initialValues: { name: '', email: '' },
  onSubmit: values => {
    console.log('onSubmit', values);
  },
})(SampleForm);
```

---

# Error<br>Boundery

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI

<!-- prettier-ignore -->
***

### ErrorBoundery

```jsx
export default class ErrorBoundery extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error">Oops, error occured</div>;
    }
    return this.props.children;
  }
}
```

<!-- prettier-ignore -->
***

## Use of ErrorBoundery

```jsx
import ErrorBoundery from './errorBoundery';

const App = () => (
  <ErrorBoundary>
    <MyForm />
  </ErrorBoundary>;
)

export default App;
```

Error Bounderies can be placed on any level

---

# Render Prop

> A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

<!-- prettier-ignore -->
***

## Basic Sample

<!-- prettier-ignore -->
```js
const App = () => (
  <ShareSecretToLife render={({ secretToLife }) => (
      <h1>
        <b>{secretToLife}</b>
      </h1>
    )}
  />
);
```

<!-- prettier-ignore -->
```jsx
const SECRET_TO_LIFE = 'If it feels good, do it';

default export class ShareSecretToLife extends Component {
  render() {
    return <div>
        {this.props.render({ secretToLife: SECRET_TO_LIFE })}
    </div>;
  }
}
```

<!-- prettier-ignore -->
***

### Render props - children

<!-- prettier-ignore -->
```jsx
const SECRET_TO_LIFE = 42;

default export class ShareSecretToLife extends Component {
  render() {
    return <div>
        {this.props.children({ secretToLife: SECRET_TO_LIFE })}
    </div>;
  }
}
```

<!-- prettier-ignore -->
```js
const ShareSecretWithWorld = () => (
  <ShareSecretToLife>
    {({ secretToLife }) => (
      <h1>
        <b>{secretToLife}</b>
      </h1>
    )}
  </ShareSecretToLife>
);
```

[More Samples](https://levelup.gitconnected.com/understanding-react-render-props-by-example-71f2162fd0f2)

<!-- prettier-ignore -->
***

## Exercise

Modify the ErrorBoudery with an render prop so we can have an optional customized error rendering

Optional: Create Repeat component

```
<Repeat numTimes={10} render={
  (total, index) => <p>number {index} of {total}</p>
}
</Repeat>
```

Optional: Create ForEach component

```
<ul>
  <ForEach data={myArray}>
    {(item) => <li>{item.name}</li> }
  </ForEach>
</ul>
```

<!-- prettier-ignore -->
***

### Formik with Render Props

```html
<Formik
  initialValues={{
    firstName: '',
    email: '',
  }}
  onSubmit={values => {
    console.log(values);
  }}
  render={() => (
    <Form>
      <label htmlFor="firstName">First Name</label>
      <Field name="firstName" />

      <label htmlFor="email">Email</label>
      <Field name="email" type="email" />

      <button type="submit">Submit</button>
    </Form>
  )}
/>
```

---

# Context

Using context, we can avoid passing props through intermediate elements

<!-- prettier-ignore -->
***

## Context

<img src="./images/prop-drilling-v-context.png">

<!-- prettier-ignore -->
***

## Context Provider

Provide a value

```jsx
// Create the context
export const ThemeContext = React.createContext('light');

// Component providing the context value
export default class App extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}
```

<!-- prettier-ignore -->
***

### Context Consumer

Some component deeper in the hierarchy...

Use a Consumer to read the current theme context. <br>React will find the closest theme Provider above and use its value.

```jsx
import { ThemeContext } from './app';

const ThemedButton = props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```

A "render prop" is used to get the value.

<!-- prettier-ignore -->
***

### contextType

Context simplified (available on React 16.6)

```jsx
import { ThemeContext } from './app';
```

```jsx
class ThemedButton2 extends React.Component {
  static contextType = ThemeContext;
  render() {
    <Button {...this.props} theme={this.context.theme} />}
  }
}
```

This method only allows you to consume one context.

<!-- prettier-ignore -->
***

### Context

Context can be a complex object

```jsx
export const ThemeContext = React.createContext({
  theme: 'dark',
  maxWidth: '800px',
  font: 'Helvetica',
  toggleTheme: () => {},
});
```

<!-- prettier-ignore -->
***

## Exercise

Avoid prop drilling by using StateProvider

From

```html
<div>
  <Red number={this.state.number} />
  <Green
    number={this.state.number}
    onIncrement={this.handleIncrement}
  />
</div>
```

To

```html
<StateProvider initialValue={10}>
  <Red>
  <Green>
</StateProvider>
```

<!-- prettier-ignore -->
***

### Consume Context with a HOC

```js
const ThemeContext = React.createContext('light');

export default withTheme = Component => {
  return props => {
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
});
```

```js
const Button = ({ theme, ...rest }) => {
  return <button className={theme} {...rest} />;
};

const ThemedButton = withTheme(Button);
```

<!-- prettier-ignore -->
***

### Unstated

```js
import { Provider, Subscribe, Container } from 'unstated';
class CounterContainer extends Container {
  state = {
    count: 0,
  };
  increment() {
    this.setState({ count: this.state.count + 1 });
  }
}
```

```js
<Subscribe to={[CounterContainer]}>
  {counter => (
    <div>
      <button onClick={() => counter.decrement()}>-</button>
      <span>{counter.state.count}</span>
    </div>
  )}
</Subscribe>
```

```html
<Provider>
  <Counter />
</Provider>
```

---

# Hooks

> Hooks are a new feature proposal that lets you use state and other React features without writing a class

for React 16.7 (1Q2019) 🙁

<!-- prettier-ignore -->
***

### A Classic component

```js
import React, { Component } from 'react';

export class Users extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    const res = await axios.get('users.json');
    this.setState({
      users: res.data,
    });
  }

  render() {
    return (
      <ul>
        {this.state.users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    );
  }
}
```

<!-- prettier-ignore -->
***

### Using hooks

```js
import React, { Component, useState } from 'react';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const res = await axios.get('users.json');
    setUsers(res.data);
  });

  return (
    <ul>
      {users.map(user => {
        return <li key={user.id}>{user.name}</li>;
      })}
    </ul>
  );
};
```

<!-- prettier-ignore -->
***

### Render Props vs Hooks

```jsx
<ScrollPosition>
  {position => (
    <div>
      <p>You are at {position}</p>
    </div>
  )}
</ScrollPosition>
```

vs

```js
const MyComp = () => {
  let position = useScrollPosition();
  return (
    <div>
      <p>You are at {position}</p>
    </div>
  );
};
```

See also [awesome-react-hooks](https://github.com/rehooks/awesome-react-hooks)

---

# Resources

> Get the extra information

<!-- prettier-ignore -->
***

## Resources

Info

- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
- [Never Write Another HoC](https://www.youtube.com/watch?v=BcVAq3YFiuc)
- [8 no-Flux strategies for React component communication](https://www.javascriptstuff.com/component-communication/)
- [Beware: React setState is asynchronous!](https://medium.com/@wereHamster/beware-react-setstate-is-asynchronous-ce87ef1a9cf3)

<!-- prettier-ignore -->
***

## Resources

Patterns

- [React component patterns](https://medium.com/teamsubchannel/react-component-patterns-e7fb75be7bb0)
- [Reusable Code Patterns](https://benmccormick.org/2016/01/08/reusable-code-patterns/)
- [ReactJS: Code Reuse Patterns](https://www.youtube.com/watch?v=0BNgi9vofaw)
- [React Patterns in a Nutshell](https://www.youtube.com/watch?v=C6w7R501oug)
- [Simple React Patterns](https://lucasmreis.github.io/blog/simple-react-patterns/)

---

# Ready to build you React Apps

```

```
