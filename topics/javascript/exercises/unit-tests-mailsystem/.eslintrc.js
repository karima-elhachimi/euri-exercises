module.exports = {
  extends: ['airbnb-base', 'plugin:jest/recommended'],
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
    jest: true,
  },
  rules: {
    // Not our taste
    'no-console': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'no-plusplus': 'off',
    // Don't play nicely with Windows.
    'linebreak-style': 'off',
  },
};
