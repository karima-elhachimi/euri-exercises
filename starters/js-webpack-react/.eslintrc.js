module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended'],
  plugins: ['import'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true
    }
  },
  globals: {},
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  rules: {
    'linebreak-style': 'off', // Don't play nicely with Windows.

    'consistent-return': 'off', // Not our taste?
    'no-plusplus': 'off', // Not our taste?
    'import/no-named-as-default': 'off',
    'react/forbid-prop-types': 'off',
    'jest/no-focused-tests': 'error'
  },
};
