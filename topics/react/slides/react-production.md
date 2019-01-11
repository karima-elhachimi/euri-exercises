---
title: React in Production
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

# React in Production

## Introduction

<img src="./images/react.png" width="300px"/><br>

<small>
Copyright (c) 2018-2019 Euricom nv.
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

# Production

> Don't put your development in production

<!-- prettier-ignore -->
***

### NODE_ENV === "production"

The environment at build time is controlled by

```
// webpack.config.js
new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('production')
}),
new webpack.optimize.UglifyJsPlugin()
```

during build you get an optimized build for production.

for example:

```js
if (process.NODE_ENV === "production") {
  // production only code
}
```

<!-- prettier-ignore -->
***

## Loglevel

Minimal lightweight logging for JavaScript

```bash
# Add dependencies
yarn install loglevel
```

use

```js
import log from "loglevel";

// Set the logLevel
log.setLevel(process.NODE_ENV === "production" ? "warn" : "info");

// some other place in the program
log.warn("something is wrong here");
log.debug("details", result);
```

<!-- prettier-ignore -->
***

## Other optimizations

- Minified production build (WebPack)
- Avoid Reconciliation (Pure Components)
- Virtualize Long Lists
  - [react-window](https://react-window.now.sh/#/examples/list/fixed-size)
  - [react-virtualized](https://bvaughn.github.io/react-virtualized/#/components/List)
- Enabling Gzip on Your Web Server
- Employ code splitting (Lazy & Suspense)

---

# Ready to put your app in Production
