---
title: Introduction to WebPack
transition: 'fade'
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
$ npm i --save-dev webpack webpack-cli
# yarn add webpack webpack-cli --dev
```

Use

```bash
$ npx webpack --version
4.35.3
```

<!-- prettier-ignore -->
***

## My App

userService.js

```js
// a commonJS module
function userService() {
  this.getById = function(id) {
    return { id: 123, name: 'peter' };
  };
  this.getAll = function() {
    return [{ id: 123, name: 'peter' }, { id: 222, name: 'robbert' }];
  };
}
module.exports = new userService();
```

main.js

```js
const userService = require('./userService');
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
  entry: './main.js',
  mode: 'development',
  output: {
    filename: 'bundle.js'
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
    return { id: 123, name: 'peter' };
  };
  this.getAll = function() {
    return [{ id: 123, name: 'peter' }, { id: 222, name: 'robbert' }];
  };
}

export default new UserService();
```

```js
// ./main.js
import userService from './userService';
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
npm i --save jquery # yarn add jquery
```

Add some html

```html
<ul id="list" />
```

and use it

```js
// main.js
import $ from 'jquery';
import userService from './userService';
var users = userService.getAll();
users.forEach(function(user) {
  $('#list').append(`<li>${user.name}</li>`);
});
```

<!-- prettier-ignore -->
***

## Add jquery

When running webpack we can see jquery is bundled with our own code.

```
$ npx webpack --display-modules
Hash: cb268c59b64d8a4edada
Version: webpack 4.35.3
Time: 288ms
Built at: 2019-07-16 2:16:00 PM
    Asset     Size  Chunks             Chunk Names
bundle.js  315 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./main.js] 186 bytes {main} [built]
[./node_modules/jquery/dist/jquery.js] 274 KiB {main} [built]
[./userService.js] 260 bytes {main} [built]
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
$ npm i --save-dev webpack-dev-server
# yarn add webpack-dev-server --dev
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
npm run serve

> webpack-dev-server --open

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Users/tommarien/git/temp
ℹ ｢wdm｣: wait until bundle finished: /
ℹ ｢wdm｣: Hash: 92f69b0f972f8ddf052a
Version: webpack 4.35.3
Time: 584ms
Built at: 2019-07-16 2:20:59 PM
    Asset     Size  Chunks             Chunk Names
bundle.js  671 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[0] multi (webpack)-dev-server/client?http://localhost ./main.js 40 bytes {main} [built]
[./main.js] 186 bytes {main} [built]
[./node_modules/jquery/dist/jquery.js] 274 KiB {main} [built]
    + 20 hidden modules
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
npm i --save-dev @babel/core @babel/preset-env

# Install webpack babel loader
npm i --save-dev babel-loader
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
npm i --save-dev style-loader css-loader
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
require('./style.css');
```

or

```js
import './style.css';
```

> Re-run webpack and “ta-da”!

<!-- prettier-ignore -->
***

## Add SASS support

Install loader (and dependencies):

```bash
# install sass itself and the loader
npm i --save-dev sass-loader node-sass
```

Add the rule in your webpack.config.js

```javascript
{
  test:  /\.(sa|sc|c)ss$/,
  loader: 'style-loader!css-loader!sass-loader'
}
```

<!-- prettier-ignore -->
***

## Add SASS support

rename your css to scss

```bash
mv style.css style.scss
```

require (or import) your scss file

```js
require('./style.scss');
```

and write some sass code

```scss
$primary-color: tomato;

body {
  background: $primary-color;
}
```

<!-- prettier-ignore -->
***

## Add fonts, images & other files

Install font

```bash
npm i --save font-awesome
```

Install webpack loaders

```bash
# the file-loader emits files
npm i --save-dev file-loader

 # the url-loader uses DataUrls
npm i --save-dev url-loader
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
        loader: 'file-loader'
      },
      {
        test: /\.(png|jpg|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=4000'
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
import 'font-awesome/css/font-awesome.css';
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

Global extensions on top of the WebPack functionality

Plugin configuration

```js
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
const { DefinePlugin } = require('webpack');
```

```js
module.exports = (env, args) => {
    const devMode = args.mode !== 'production';

    return {
      entry: './main.js',
      output: { ... },
      module: { ... },
      plugins: [
        new DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify(devMode ? 'development' : 'production'),
          }
        })
      ]
    };
};
```

In your code you can use the variable:

```js
console.log('Environment:', process.env.NODE_ENV);
```

<!-- prettier-ignore -->
***

## Clean Webpack Plugin

Ensure we have a clean dist folder everytime we build

Install

```bash
npm i --save-dev clean-webpack-plugin
```

Configure
---HERE---

```js
// webpack.config.js

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, args) => {
    const devMode = args.mode !== 'production';

    return {
      entry: './main.js',
      output: { ... },
      module: { ... },
      plugins: [
        new CleanWebpackPlugin({ }),
        new DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify(devMode ? 'development' : 'production'),
          }
        })
      ]
    };
```

## Html Webpack Plugin

Install

```bash
npm i --save-dev html-webpack-plugin
```

<!-- prettier-ignore -->
***

## Extract CSS

Install

```bash
npm i --save-dev mini-css-extract-plugin
```

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css'
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
          'css-loader'
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
  entry: 'main.js',
  resolve: {
    extensions: ['.ts', '.js']
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
  devtool: 'source-map',
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
const env = process.env.NODE_ENV || 'development';
function config() {
  switch (env) {
    case 'production':
      return 'prod';
    case 'development':
      return 'dev';
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
    main: './main.ts',
    other: './other.ts'
  },
  output: {
    filename: '[name].js', // bundle output filename
    path: __dirname + '/bundle',
    publicPath: 'bundle'
  }
  // other stuff
};
```

---

## Resources

Books

- [SURVIVEJS — WEBPACK](https://survivejs.com/webpack/)

Articles

- [Webpack — The Confusing Parts](https://medium.com/@rajaraodv/webpack-the-confusing-parts-58712f8fcad9)
- [Webpack your bags](https://blog.madewithlove.be/post/webpack-your-bags/)

Tools

[webpack-merge](https://github.com/survivejs/webpack-merge)
