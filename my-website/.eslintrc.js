module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['react', '@babel'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'always'],
    'react/prop-types': 0
  }
};
