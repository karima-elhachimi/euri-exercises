---
title: Introduction to WebPack
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

## Introduction to WebPack

<img src="./images/webpack.jpg" width="800px" /><br>
<small>
Copyright (c) 2017-2019 Euricom nv.
</small>

<!-- markdownlint-disable -->
<br>
<style type="text/css">
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
    font-size: 80%;
}
.reveal pre code {
    display: block;
    padding: 5px;
    overflow: auto;
    max-height: 800px;
    word-wrap: normal;
    font-size: 90%;
}
</style>

---

# Basic Setup

> Webpack is easier then you think

<!-- prettier-ignore -->
***

## Install webpack

Install webpack locally

```bash
$ yarn add webpack webpack-cli --dev
# npm install add webpack webpack-cli --save-dev
```

Use

```bash
$ npx webpack --version
4.28.2
```

<!-- prettier-ignore -->
***

## My App

userService.js

```js
// a commonJS module
function userService() {
  this.getById = function(id) {
    return { id: 123, name: "peter" };
  };
  this.getAll = function() {
    return [{ id: 123, name: "peter" }, { id: 222, name: "robbert" }];
  };
}
module.exports = new userService();
```

main.js

```js
const userService = require("./userService");
const users = userService.getAll();
users.forEach(function(user) {
  console.log(user.id, user.name);
});
```

<!-- prettier-ignore -->
***

## My App

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Webpack 101</title>
  </head>
  <body>
    <h1>Webpack 101</h1>
    <script src="dist/bundle.js"></script>
  </body>
</html>
```

<!-- prettier-ignore -->
***

## Config

A minimal config file

```js
// webpack.config.js
module.exports = {
  entry: "./main.js",
  mode: "development",
  output: {
    filename: "bundle.js"
  }
};
```

<!-- prettier-ignore -->
***

## Bundle it

Via command line (when installed globally)

```bash
npx webpack         # for building once for development
npx webpack -p      # for production (minification)
npx webpack --watch # watch file changes and rebuild
```

Via npm script

```json
"scripts": {
    "build": "webpack",
    "build:prod": "webpack -p"
}
```

<!-- prettier-ignore -->
***

### Run the app

Open your app with [serve](https://www.npmjs.com/package/serve) or [live-server](https://www.npmjs.com/package/live-server)

```
$ live-server
Serving "/Users/me/temp/my-app" at http://127.0.0.1:8080
Ready for changes
```

<!-- prettier-ignore -->
***

### Native Support for ESM

```js
// ./userService.js
function UserService() {
  this.getById = function(id) {
    return { id: 123, name: "peter" };
  };
  this.getAll = function() {
    return [{ id: 123, name: "peter" }, { id: 222, name: "robbert" }];
  };
}

export default new UserService();
```

```js
// ./main.js
import userService from "./userService";
var users = userService.getAll();
users.forEach(function(user) {
  console.log(user.id, user.name);
});
```

> It just works

<!-- prettier-ignore -->
***

## Add jquery

Install

```bash
yarn add jquery # npm install jquery
```

Add some html

```html
<ul id="list" />
```

and use it

```js
// main.js
import $ from "jquery";
import userService from "./userService";
var users = userService.getAll();
users.forEach(function(user) {
  $("#list").append(`<li>${user.name}</li>`);
});
```

<!-- prettier-ignore -->
***

## Add jquery

When running webpack we can see jquery is bundled with our own code.

```
$ webpack
Hash: f7e4f8b006ab65596006
Version: webpack 4.28.2
Time: 295ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  271 kB       0  [emitted]  [big]  main
   [0] ./~/jquery/dist/jquery.js 267 kB {0} [built]
   [1] ./userService.js 621 bytes {0} [built]
   [2] ./main.js 227 bytes {0} [built]
```

---

# Dev Server

> No need to start your own web server

The Webpack-dev-server combines automatic refresh (after bundle rebuild), faster bundeling and hot module replacement.

<!-- prettier-ignore -->
***

## Setup

```bash
# install
$ yarn add webpack-dev-server --dev
# npm install webpack-dev-server --save-dev
```

```json
// package.json
{
  "scripts": {
    "build": "webpack",
    "serve": "webpack-dev-server --open"
  }
}
```

<!-- prettier-ignore -->
***

## Run

```bash
yarn serve

yarn run v1.12.3
$ webpack-dev-server --open
ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wdm｣: wait until bundle finished: /
ℹ ｢wdm｣: Hash: 67b08579de3b9b2b20a6
Version: webpack 4.28.2
Time: 627ms
Built at: 2018-12-28 09:20:08
    Asset     Size  Chunks             Chunk Names
bundle.js  644 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[0] multi (webpack)-dev-server/client?http://localhost:8080 ./main.js 40 bytes {main} [built]
[./main.js] 180 bytes {main} [built]

...

ℹ ｢wdm｣: Compiled successfully.
```

Webpack-dev-server will build and serve the app.
Mark that no bundle file is created. All is done in memory.

<!-- prettier-ignore -->
***

## Config

```js
// webpack.config.js
module.exports = {
    ...
    output: {
        filename: 'bundle.js',
        publicPath: '/dist/'       // is required for webpack-dev-server
    },
    devServer: {
        historyApiFallback: true,  // support for html5 mode
        noInfo: true,              // limit output
        proxy: {                   // proxy all url from /api to ...
            '/api': {
                target: 'https://other-server.example.com',
            }
        }
    }
    ...
}
```

Additional config is provided via the webpack.config.js

<!-- prettier-ignore -->
***

## Output to other folder

```js
    output: {
        filename: 'bundle.js',
        path: __dirname + '/bundle',  // separate folder
        publicPath: '/bundle/'
    },
```

The `publicPath` specifies the public URL address of the output files when referenced in a browser.

Change the bundle folder in your html file

```html
<script src="bundle/bundle.js"></script>
```

---

# Rules

> Webpack can bundle any kind of file.

Webpack 'Rules' determine how the different types of modules (files) within a project will be handled.

<!-- prettier-ignore -->
***

## Rules

Rules configuration

```js
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/bundle',
        publicPath: '/bundle/'
    },
    module: {
      rules: [...]         // <- add your rules here
    }
};
```

<!-- prettier-ignore -->
***

## Add babel support

Install

```bash
# Install babel7
yarn add @babel/core @babel/preset-env --dev

# Install webpack babel loader
yarn add babel-loader --dev
```

Configure babel

```json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

<!-- prettier-ignore -->
***

## Add babel support

Configure babel-loader in webpack

```js
  // webpack.config.js
  output: {
    ...
  },
  module: {
    rules: [
        {
            test: /\.js$/,              // apply babel-loader for any js file
            loader: 'babel-loader',
            exclude: /node_modules/     // except in node_modules
        }
    ]
  }
  ...
```

> More information about the babel-loader see: [https://github.com/babel/babel-loader](https://github.com/babel/babel-loader)

<!-- prettier-ignore -->
***

## Add CSS support

Install some more loaders:

```bash
# install loaders
yarn add style-loader css-loader --dev
```

Add the css rule in your webpack.config.js

```json
{ "test": /\.css$/, "loader": "style-loader!css-loader" }
```

Add a style sheet

```css
/* style.css */
body {
  background: tomato;
}
```

<!-- prettier-ignore -->
***

## Add CSS support

And require the file in your main.js

```js
// in your modules just require the stylesheet
// This has the side effect that a <style>-tag is added to the DOM.
require("./style.css");
```

or

```js
import "./style.css";
```

> Re-run webpack and “ta-da”!

<!-- prettier-ignore -->
***

## Add LESS support

Install loader (and dependencies):

```bash
# install less itself and the loader
yarn add less-loader less --dev
```

Add the rule in your webpack.config.js

```js
{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
```

<!-- prettier-ignore -->
***

## Add LESS support

rename your css to less

```bash
mv style.css style.less
```

require (or import) your scss file

```js
require("./style.less");
```

and write some less code

```css
@primary-color: LightGray;
body {
  background: @primary-color;
}
```

<!-- prettier-ignore -->
***

## Add fonts, images & other files

Install font

```bash
yarn add font-awesome --dev
```

Install webpack loaders

```bash
# the file-loader emits files
yarn add file-loader --dev

 # the url-loader uses DataUrls
yarn add url-loader --dev
```

<!-- prettier-ignore -->
***

### Add fonts, images & other files

Config in webpack

```js
module.exports = {
  module: {
    rules: [
      // ....
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      },
      {
        test: /\.(png|jpg|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=4000"
      }
    ]
  }
};
```

<!-- prettier-ignore -->
***

## Add fonts

Require (import) the css in your main file

```js
import "font-awesome/css/font-awesome.css";
```

Add an icon in your html

```html
<h1>Webpack 101</h1>
<i class="fa fa-font-awesome fa-5x"></i>
```

And your icon is on your page!

> Mark that webpack has renamed the font file and modified the css.

---

# Plugins

> Optional pre and post processing

<!-- prettier-ignore -->
***

## Plugins

Global extentions on top of the WebPack functionality

Plugin configuration

```
module.exports = {
    entry: './main.js',
    output: {
        filename: 'bundle.js'
    },
    plugins: [...]         // <- add your plugins here
};
```

<!-- prettier-ignore -->
***

### Add predefined variables

Injected variable into our javascript code:

```js
const webpack = require("webpack");
```

```js
module.exports = {
  entry: "./main.js",
  output: {
    filename: "bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    })
  ]
};
```

In your code you can use the variable:

```js
console.log("Environment: ", process.env.NODE_ENV);
```

<!-- prettier-ignore -->
***

## Extract CSS

```bash
# install
yarn add mini-css-extract-plugin --dev
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
  // ...
};
```

<!-- prettier-ignore -->
***

## Extract CSS - Next

```js
{
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // need to add another loader
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ];
  }
}
```

<!-- prettier-ignore -->
***

## Many more plugins

- Utility
  - webpack.NoErrorsPlugin
  - html-webpack-plugin
  - browser-sync-webpack-plugin
  - ...
- Optimize
  - CopyWebpackPlugin
  - BundleAnalyzerPlugin
  - ...

---

# Optimization

> Make a bundle as small as possible

<!-- prettier-ignore -->
***

## Production build

```bash
# build in production mode
webpack --mode production
Hash: 619832e9711bc171e04e
Version: webpack 4.28.2
Time: 1048ms
Built at: 2019-01-02 10:11:51
                                 Asset      Size  Chunks                    Chunk Names
  36d50c1381fda7c71d12b6643cbe1ee0.svg  82 bytes          [emitted]
  674f50d287a8c48dc19ba404d20fe713.eot   162 KiB          [emitted]
  912ec66d7572ff821749319396470bde.svg   434 KiB          [emitted]
af7ae505a9eed503f8b8e6982036873e.woff2  75.4 KiB          [emitted]
  b06871f281fee6b241d60582ae9369b9.ttf   162 KiB          [emitted]
                             bundle.js  7.03 KiB       0  [emitted]         main
 fee66e712a8a08eef5805a46892932ad.woff  95.7 KiB          [emitted]
                              main.css  36.5 KiB       0  [emitted]         main
```

bundle.js = 7.03KB, main.css = 36.5KB

### Webpack will automatically optimize the JS but NOT the CSS.

<!-- prettier-ignore -->
***

## Optimize CSS

```bash
# install plugin
yarn add optimize-css-assets-webpack-plugin --dev
```

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
       new OptimizeCSSAssetsPlugin({}),
    ]
};
```

See more at [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)

<!-- prettier-ignore -->
***

## Result

```bash
# build in production mode + CSS Optimize
webpack --mode production
Hash: a6fe9d86c303d1489f56
Version: webpack 4.28.2
Time: 2115ms
Built at: 2019-01-02 10:18:10
                                 Asset      Size  Chunks                    Chunk Names
  36d50c1381fda7c71d12b6643cbe1ee0.svg  82 bytes          [emitted]
  674f50d287a8c48dc19ba404d20fe713.eot   162 KiB          [emitted]
  912ec66d7572ff821749319396470bde.svg   434 KiB          [emitted]
af7ae505a9eed503f8b8e6982036873e.woff2  75.4 KiB          [emitted]
  b06871f281fee6b241d60582ae9369b9.ttf   162 KiB          [emitted]
                             bundle.js  20.8 KiB       0  [emitted]         main
 fee66e712a8a08eef5805a46892932ad.woff  95.7 KiB          [emitted]
                              main.css  30.3 KiB       0  [emitted]         main

```

bundle.js = 20.8KB, main.css = 30.3KB

CSS is optimized, but JS is bigger now!!!
We need to manually configure the JS optimize.

<!-- prettier-ignore -->
***

## Optimize JS

```bash
# install plugin
yarn add terser-webpack-plugin --dev
```

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin(
      cache: true,
         parallel: true,
         sourceMap: true, // set to true if you want JS source maps
       }),
       new OptimizeCSSAssetsPlugin({}),
    ]
};
```

[terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

<!-- prettier-ignore -->
***

## Result

```bash
# build in production mode + CSS & JS Optimize
webpack --mode production
Hash: 619832e9711bc171e04e
Version: webpack 4.28.2
Time: 1499ms
Built at: 2019-01-02 10:22:47
                                 Asset      Size  Chunks                    Chunk Names
  36d50c1381fda7c71d12b6643cbe1ee0.svg  82 bytes          [emitted]
  674f50d287a8c48dc19ba404d20fe713.eot   162 KiB          [emitted]
  912ec66d7572ff821749319396470bde.svg   434 KiB          [emitted]
af7ae505a9eed503f8b8e6982036873e.woff2  75.4 KiB          [emitted]
  b06871f281fee6b241d60582ae9369b9.ttf   162 KiB          [emitted]
                             bundle.js  7.03 KiB       0  [emitted]         main
 fee66e712a8a08eef5805a46892932ad.woff  95.7 KiB          [emitted]
                              main.css  30.3 KiB       0  [emitted]         main
```

bundle.js = 7.03KB, main.css = 30.3KB

---

# More advanced setup

> A more production ready config

<!-- prettier-ignore -->
***

## DevTool

Choose a developer tool to enhance debugging.

```js
module.exports = {
    ...
    devtool: 'sourcemap'
}
```

See https://webpack.github.io/docs/configuration.html#devtool

<!-- prettier-ignore -->
***

## Build for other environments

webpack.common.js

```js
// config/webpack.common.js
module.exports = {
  entry: "main.js",
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    // common rules
  },
  plugins: [
    // common plugins
  ]
};
```

<!-- prettier-ignore -->
***

### Build for other environments

webpack.dev.js

```js
// congig/webpack.dev.js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
module.exports = merge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            // dev only rules
        ]
    },
    devServer: {
        ...
    }
})
```

<!-- prettier-ignore -->
***

### Build for other environments

webpack.prod.js

```js
// config/webpack.prod.js
module.exports = merge(commonConfig, {
  devtool: "source-map",
  module: {
    rules: [
      // prod only rules
    ]
  }
});
```

<!-- prettier-ignore -->
***

### Build for other environments

webpack.config.js

```js
// webpack.config.js
const env = process.env.NODE_ENV || "development";
function config() {
  switch (env) {
    case "production":
      return "prod";
    case "development":
      return "dev";
    default:
      throw new Error(`Invalid or unknow environment: ${env}`);
  }
}
module.exports = require(`./config/webpack.${config()}.js`);
```

<!-- prettier-ignore -->
***

## Build for other environments

Use

```bash
# OSX
NODE_ENV=production webpack

# Windows
set NODE_ENV=production && webpack

# Multi platform
cross-env NODE_ENV=production webpack
```

```json
// package.json
...
"scripts": {
    "build": "cross-env NODE_ENV=production webpack",
}
```

<!-- prettier-ignore -->
***

## Multiple bundles

```js
module.exports = {
  entry: {
    main: "./main.ts",
    other: "./other.ts"
  },
  output: {
    filename: "[name].js", // bundle output filename
    path: __dirname + "/bundle",
    publicPath: "bundle"
  }
  // other stuff
};
```

---

## Resources

Books

- [URVIVEJS — WEBPACK](https://survivejs.com/webpack/)

Articles

- [Webpack — The Confusing Parts](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
- [Webpack your bags](https://blog.madewithlove.be/post/webpack-your-bags/)

Tools

[webpack-merge](https://github.com/survivejs/webpack-merge)
