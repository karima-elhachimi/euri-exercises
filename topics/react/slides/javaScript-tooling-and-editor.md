---
title: JavaScript, Tooling and Editor
transition: 'fade'
verticalSeparator: "^\\*\\*\\*"
---

## JavaScript Tooling and Editor

<img src="./images/tooling.jpg" width="400px" /><br>
<small>
by Peter Cosemans<br>
Copyright (c) 2017-2018 Euricom nv.
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

# It's not your old JavaScript anymore

> Tooling will help us

<!-- prettier-ignore -->
***

## Tooling

- **_NodeJS_** - Cross-platform JavaScript runtime environment.
- **_Npm_** - JavaScript module package manager
- **_WebPack_** - Task runner and module bundler.
- **_Babel_** - ES6+ to JavaScript transpiler
- **_Prettier_** - An opinionated code formatter
- **_Linting_** - Analyse your code for potential errors

---

# GIT

Git is used everywhere

- All open source projects
- All JavaScript libraries
- Default support in IDE & editors
- All npm modules are stored on github
- All content of this workshop :)

<!-- prettier-ignore -->
***

# GIT

Clone this repo

```
mkdir git
cd git
git clone https://github.com/Euricom/training-workshop-ES-React-2018Q3.git
cd training-workshop-ES-React-2018Q3
```

Get latest version of repo

```
cd training-workshop-ES-React-2018Q3
git pull
```

<!-- prettier-ignore -->
***

# GIT

3th party git tools

- [SourceTree](https://www.sourcetreeapp.com/)
- [Gitkraken](https://www.gitkraken.com/)

---

# Markdown

> The text format for developers

<!-- prettier-ignore -->
***

## Markdown

All slides and documentation is in markdown

```markdown
# Header 1

## Header 2

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces

Ordered

1.  Lorem ipsum dolor sit amet
2.  Consectetur adipiscing elit
3.  Integer molestie lorem at massa
```

See Also [here](https://guides.github.com/features/mastering-markdown/) and [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

<!-- prettier-ignore -->
***

# Markdown

Tools

- [VSCode](https://code.visualstudio.com/)
- [MarkdownPad](http://markdownpad.com) - Windows Only
- [Caret](https://caret.io/)

Online Tools

- [HackMD](https://hackmd.io/)
- [Dillinger](https://dillinger.io/)
- [StackEdit](https://stackedit.io/editor)

---

# NodeJS

> Your Javascript engine for the desktop

<!-- prettier-ignore -->
***

## NodeJS - Active LTS or Current

To Install
[https://nodejs.org/en/](https://nodejs.org/en/)

<img src="./images/node-schedule.png" width="600px" /><br>

[https://github.com/nodejs/Release#release-schedule](https://github.com/nodejs/Release#release-schedule)

<!-- prettier-ignore -->
***

## NPM

### Node Package Manager

The JavaScript way of packaging and deploying code (modules)

```bash
# versions
$ node --version      # node version
$ npm --version       # npm version

# to create a package.json
$ npm init

# to install a module
$ npm install jquery

# to install all modules defined in the package.json
$ npm install

# to remove a module
$ npm uninstall jquery --save
```

<!-- prettier-ignore -->
***

## Npm Commands

Other usefull commands

```bash
npm init
npm install eslint --save-dev   # install as desdependency
npm list --depth=0              # list local install packages
npm list --depth=0 -g           # list global install packages
npm cache clean                 # clear cache
npm config list                 # show configs
npm install -g npm@latest       # upgrade npm to latest version
```

<!-- prettier-ignore -->
***

## Npm Config

```bash
$ npm config list       # show config
$ npm config list -l    # show full config
$ npm config get cache  # show single config item
$ npm config set cache
```

Location of npm config file

```bash
# local config
$ npm config get userconfig

# global config (by default not available)
$ npm config get globalconfig
```

<!-- prettier-ignore -->
***

## Npm Registry

All modules are installed from npm registry

```bash
$ npm config get registry
$ npm config set registry <registry url>
```

Specify a different source

```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<pkg>
npm install [<@scope>/]<pkg>@<tag>
npm install [<@scope>/]<pkg>@<version>
npm install [<@scope>/]<pkg>@<version range>
npm install <folder>
npm install <tarball file>
npm install <tarball url>
npm install <git:// url>
npm install <github username>/<github project>
```

<!-- prettier-ignore -->
***

## Npm scripts

You can run small CLI script via npm/yarn

```json
{
    "name": "temp",
    "version": "1.0.0",
    "scripts": {
        "start": "node main.js"
    },
    ...
}
```

To run

```bash
$ npm run start
my-project@1.0.0 start /Users/my-user/git/my-project
> node main.js
```

<!-- prettier-ignore -->
***

## Npx

Executor for local and ad-hoc npm binaries

```bash
# add a local package
yarn add cowsay

# run local package
npx cowsay May the force be with you

# run remote package (this will install, run and uninstall)
npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
```

> Now you don't have to install tools globally or create a script line.

<!-- prettier-ignore -->
***

## Yarn

Yarn (fast, reliable and secure) alternative to npm

```bash
# install (npm install jquery)
$ yarn add jquery

# install all modules from package.json (npm install)
$ yarn

# uninstall jquery (npm uninstall)
$ yarn remove jquery

# run a script
$ yarn start

# others
$ yarn info jquery              # show information about package
$ yarn add jquery@2.2.4         # install jquery v2.2.4
$ yarn outdated                 # show which packages are outdated
$ yarn upgrade-interactive      # interactive upgrade all modules
```

---

## WebPack

[WebPack](https://webpack.js.org/) a modern bundler (compile and) for javascript.

```bash
yarn add webpack webpack-cli --dev
```

webpack.config.js

```js
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'source-maps',
  output: { path: __dirname, filename: 'bundle.js' },
};
```

Run

```bash
# development build
npx webpack

# production build
npx webpack --mode production
```

<!-- prettier-ignore -->
***

## WebPack

Add the bundle to html files

```html
<body>
  <div id="root"></div>
  <script src="bundle.js"></script>
</body>
```

<!-- prettier-ignore -->
***

## WebPack-dev-server

An development web server that bundle automatically.

install

```bash
yarn add webpack-dev-server --dev
```

run

```bash
# startup
npx webpack-dev-serve
```

Add npm scripts

```json
{
  "scripts": {
    "serve": "webpack",
    "build": "webpack",
    "build:prod": "webpack --mode production"
  }
}
```

---

# Babel

> Use the latest and greatest of ESNext

<!-- prettier-ignore -->
***

## Setup

[Using Babel (official website)](https://babeljs.io/docs/setup/)

Install

```bash
# install as npm module
yarn add babel-cli --dev
yarn add babel-preset-env babel-preset-stage-2 --dev
```

Configure: .babelrc

```json
{
  "presets": ["env", "stage-2"]
}
```

Babel needs preset to know how to build.

See [babel-preset-env](https://github.com/babel/babel-preset-env) for more information

<!-- prettier-ignore -->
***

## Add to webpack

```bash
# install as npm module
yarn add babel-loader --dev
```

```js
// update webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
```

Enjoy the latest ES7+ features :)

---

# Auto Format

> Always use a code formatter

<!-- prettier-ignore -->
***

## Prettier

Use [https://prettier.io/](Prettier) to format your code.

```js
// Input
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

```js
// Ouput
foo(
  reallyLongArg(),
  omgSoManyParameters(),
  IShouldRefactorThis(),
  isThereSeriouslyAnotherOne()
);
```

<!-- prettier-ignore -->
***

## VSCode - Plugin

Install VSCode plugin<br>

<img src="./images/prettier-vscode.png" width="300px" /><br>

[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

VSCode Setting

```
"editor.formatOnSave": true,
```

<!-- prettier-ignore -->
***

## Config

Config file: `.prettierrc`

```
{
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "useTabs": false,
  "semi": true
}
```

script

```
scripts: {
    "format": "prettier --write 'src/**/*.js'"
}
```

---

# Linting

> Don't start without it.

<!-- prettier-ignore -->
***

## Use a linter

Static code analyses to improve your code.

<img src="./images/linting.png" width="800px" /><br>

Available to JavaScript (ESLint), TypeScript (TSLint) and CSS (StyleLint)

<!-- prettier-ignore -->
***

## IDE/Editor Support

Any good JS editor support's linting: Visual Studio Code, WebStorm, Atom, ...

<img src="./images/linting-vscode.png" width="800px" /><br>

<!-- prettier-ignore -->
***

## ESLint

> The pluggable linting utility for JavaScript and JSX

<!-- prettier-ignore -->
***

## ESLint - Setup

```bash
# linter engine
yarn add eslint@4 --dev
## eslint config
yarn add eslint-config-airbnb eslint-plugin-react  --dev
yarn add eslint-plugin-jsx-a11y eslint-plugin-import  --dev
```

.eslintrc

```json
{
  "extends": ["airbnb"],
  "globals": {},
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "strict": [0],
    "no-console": [0, ""]
  }
}
```

Add npm script

```json
scripts: {
    "lint": "eslint \"./src/**/*.js\""
}
```

<small>This setup follow the airbnb styleguide: https://github.com/zalmoxisus/javascript</small>

<!-- prettier-ignore -->
***

## ESlint - VSCode

<img src="./images/eslint-vscode.png" width="300px">

[ESLint Plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

<!-- prettier-ignore -->
***

### ESLint - Disable styling rules

When using Prettier you can disable all formatting rules

```bash
# install additional eslint config
$ yarn add eslint-config-prettier --dev
```

.eslintrc

```json
{
  "extends": [
      "airbnb",
      "prettier"
  ],
  ...
}
```

No more linting errors for formatting.

---

## Starters

Pre-defined projects for easy startup. Where to find?

```
<root>/starters/react-webpack-jsx
<root>/starters/react-webpack
<root>/starters/react-parcel
<root>/starters/react-cra-prettier
```

Ready to:

- Run any React/ES6+ in browser
- Prettier setup
- Linting with AirBnb config
- Editorconfig for consistent tabs/spacing
- Usefull VSCode setup

---

# Ready to write some JavaScript
