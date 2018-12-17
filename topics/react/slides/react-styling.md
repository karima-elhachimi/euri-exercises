---
title: React Styling
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

# React Styling

<img src="./images/styled.jpg" width="300px" /><br>

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

# Styling in React

> Style your component

<!-- prettier-ignore -->
***

## Css Stylesheet

Use plain old css files

```css
/* style.css */
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.col {
  width: 32%;
}
```

```js
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const ProductList = ({ products }) => (
  <div className="flexGrid">
    {products.map(product => (
      <div className="col" key={product.id}>
        <Product product={product} />
      </div>
    ))}
  </div>
);
```

<!-- prettier-ignore -->
***

## Inline styling

They are specified with an object whose key is the camelCased version of the style name, and whose value is the style’s value, usually a string.

```js
const flexGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const colWidth = {
  width: '32%',
};

const ProductList = ({ products }) => (
  <div style={flexGrid}>
    {products.map(product => (
      <div style={colWidth} key={product.id}>
        <Product product={product} />
      </div>
    ))}
  </div>
);
```

> Styles are isolated because you get inline styles

<!-- prettier-ignore -->
***

## Css Modules

Using [Css Modules](https://github.com/css-modules/css-modules)

```js
import styles from './style.css';

const ProductList = ({ products }) => (
  <div style={styles.flexGrid}>
    {products.map(product => (
      <div style={styles.colWidth} key={product.id}>
        <Product product={product} />
      </div>
    ))}
  </div>
);
```

This requires a [special webpack config](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)

<!-- prettier-ignore -->
***

## Styled Components

Using [styled-components](https://www.styled-components.com/)

```js
import styled from 'styled-components';

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GridItem = styled.div`
  width: 32%;
`;

const ProductList = ({ products }) => (
  <Grid>
    {products.map(product => (
      <GridItem key={product.id}>
        <Product product={product} />
      </GridItem>
    ))}
  </Grid>
);
```

<!-- prettier-ignore -->
***

## Styled Components

Better use of components

```html
<button className="button">Click Me</button>
<button className="button button__primary">Click Me</button>
<h1 className"title">Customer Edit</h1>
<span styles={{color: 'red'}}>Out of stock</span>
```

vs

```html
<Button>Click Me</Button>
<Button primary>Click Me</Button>
<Title>Customer Edit</Title>
<Marked>Out of stock</Marked>
```

Even better with `babel-plugin-styled-components`

---

# Resources

> Get the extra information

<!-- prettier-ignore -->
***

## Resources

- [I swore never to use CSS in JS, here are 6 reasons why I was wrong](https://hackernoon.com/i-swore-never-to-use-css-in-js-here-are-6-reasons-why-i-was-wrong-541fe3dfdeb7)
- [Stop using CSS in JavaScript for web development](https://medium.com/@gajus/stop-using-css-in-javascript-for-web-development-fa32fb873dcc)
- [Four ways to style react components](https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822)
- [The road to styled-components](https://www.youtube.com/watch?v=2j9rSur_mnk)
- [Polished](https://github.com/styled-components/polished)
