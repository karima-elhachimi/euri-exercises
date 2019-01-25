module.exports = {
  extends: ['airbnb-base'],
  plugins: ['import'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  globals: {},
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.

    'consistent-return': 'off', // Not our taste?
    'no-plusplus': 'off', // Not our taste?
  },
};
