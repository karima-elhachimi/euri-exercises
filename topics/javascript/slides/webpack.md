---
title: Introduction to WebPack
transition: "fade"
verticalSeparator: "^\\*\\*\\*"
---

## Introduction to WebPack

<img src="./images/webpack.jpg" width="600px" /><br>
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
npm install webpack --save-dev  # yarn add webpack --dev
```

Use

```bash
npx webpack --version
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
var userService = require("./userService");
var users = userService.getAll();
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
    <script src="bundle.js"></script>
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
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [] // rules how to process files
  },
  plugins: [] // additional plugins
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
npx webpack -d      # include source maps
```

Via npm script

```json
"scripts": {
    "build": "webpack"
}
```

<!-- prettier-ignore -->
***

### Run the app

Open your app with [serve](https://www.npmjs.com/package/serve) or [live-server](https://www.npmjs.com/package/live-server)

```
$ live-server
Serving "/Users/me/git/vue-webpack" at http://127.0.0.1:8080
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
Version: webpack 2.2.0-rc.3
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
npm install webpack-dev-server --save-dev
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

```js
// webpack.config.js
module.exports = {
    output: {
        filename: 'bundle.js',
        publicPath: '/'                 // required for webpack-dev-server
    },
    ...
    devServer: {
        historyApiFallback: true,       // support for html5 mode
        noInfo: true,                   // limit output
        proxy: {                        // proxy all url from /api  to ...
            '/api': {
                target: 'https://other-server.example.com',
            }
        }
    }
    ...
}
```

<!-- prettier-ignore -->
***

## Run

```
yarn serve v0.18.1
$ webpack-dev-server --open
Project is running at http://localhost:8008/
webpack output is served from /
404s will fallback to /index.html
webpack: wait until bundle finished: /
Time: 1232ms
    Asset    Size  Chunks                    Chunk Names
bundle.js  515 kB       0  [emitted]  [big]  main
chunk    {0} bundle.js (main) 500 kB [entry] [rendered]
   [34] ./main.js 175 bytes {0} [built]
   [35] (webpack)-dev-server/client?http://localhost:8008 4.66 kB {0} [built]
   [36] ./~/ansi-regex/index.js 135 bytes {0} [built]
   [37] ./userService.js 170 bytes {0} [built]
   ...
   [76] ./~/url/url.js 23.3 kB {0} [built]
   [77] ./~/url/util.js 314 bytes {0} [built]
   [78] (webpack)-dev-server/client/socket.js 856 bytes {0} [built]
   [80] (webpack)/hot/emitter.js 77 bytes {0} [built]
   [81] multi (webpack)-dev-server/client?http://localhost:8008 ./main.js 40 bytes {0} [built]
     + 67 hidden modules
webpack: bundle is now VALID.
```

> The browser is automatically opened.

Mark that no bundle file is created. All is done in memory.

<!-- prettier-ignore -->
***

## Output to folder

```js
    output: {
        filename: 'bundle.js',
        path: __dirname + '/bundle',        // separate folder
        publicPath: '/bundle/'
    },
```

The `publicPath` specifies the public URL address of the output files when referenced in a browser.

Specify the bundle folder in your html file

```html
<script src="bundle/bundle.js"></script>
```

---

# Rules

> Webpack can bundle any kind of file.

Webpack 'Rules' determine how the different types of modules (files) within a project will be handled.

<!-- prettier-ignore -->
***

## Add babel support

Install babel-loader (webpack) & babel

```bash
yarn add babel-core babel-preset-latest babel-preset-stage-2 --dev
yarn add babel-loader --dev
```

Configure babel (simplified)

```json
// .babelrc
{
  "presets": ["latest", "stage-2"]
}
```

> More information about babel and its configuration see:[https://babeljs.io/](https://babeljs.io/).

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
npm install style-loader css-loader url-loader --save-dev
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
npm install font-awesome --save-dev
```

Install webpack loaders

```bash
# the file-loader emits files
npm install file-loader --save-dev
 # the url-loader uses DataUrls
npm install url-loader --save-dev
```

<!-- prettier-ignore -->
***

### Add fonts, images & other files

Config in webpack

```js
module.exports = {
  module: {
    rules: [
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

Or import the scss in your scss file

```css
$fa-font-path: "~font-awesome/fonts";
@import "~font-awesome/scss/font-awesome";
```

Add an icon in your html

```html
<i class="fa fa-font-awesome fa-5x"></i>
```

And your icon is on your page!

> Mark that webpack has renamed the font file and modified the css.

---

# Plugins

> All what you can't do with a rule

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

## Optimize Javascript

```bash
# install plugin
yarn add terser-webpack-plugin --save
```

```js
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new TerserPlugin()]
  }
};
```

[terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin)

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

```js
// config/webpack.prod.js
module.exports = merge(commonConfig, {
  devtool: "source-map"
});
```

<!-- prettier-ignore -->
***

## Build for other environments

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

<!-- prettier-ignore -->
***

## Extract text (css) from bundle

By default webpack will bundle all in one module. But for css we typically want a separate style.css file.

```bash
npm install --save-dev extract-text-webpack-plugin
```

setup config

```js
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = {
    ...
    module: {
        rules: [
            // {  test: /\.scss$/, loader: 'style-loader!css-loader!less-loader' }
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            }
        ]
    },
    plugins: [ new ExtractTextPlugin('styles.css') ]
}
```

<!-- prettier-ignore -->
***

## Hot Module Replacement

```json
"scripts": {
    "build": "corss-env NODE_ENV=production webpack",
    "serve": "webpack-dev-server --open --hot --inline"
}
```

Restart webpack-dev-server and thats all. Try to change a css/less file

> Hot module replacement doesn't work together with the 'ExtractTextPlugin' plugin.

<!-- prettier-ignore -->
***

## Tree Shaking

Tree shaking eliminates unused exports

```js
export function getById(id) {
  return { id: 123, name: "john" };
}

export function getAll() {
  return [{ id: 123, name: "peter" }, { id: 222, name: "robbert" }];
}
```

```js
import { getAll } from "./userService";
var users = getAll();
users.forEach(function(user) {
  console.log(user.id, user.name);
});
```

<!-- prettier-ignore -->
***

## Tree Shaking

Specify babel will not generate CommonJS modules

```json
{
  "presets": [["es2015", { "modules": false }]]
}
```

And run webpack with the optimise flag

```bash
$ webpack --optimize-minimize
```

---

## Resources

Books

    https://github.com/survivejs/webpack

Articles

    https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9
    https://blog.madewithlove.be/post/webpack-your-bags/

Tools

    https://github.com/survivejs/webpack-merge
