module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  globals: {},
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.
    'consistent-return': 'off', // Not our taste?
    'no-plusplus': 'off', // Not our taste?
  }
};
