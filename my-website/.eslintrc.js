module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', '@babel', 'jsx-a11y'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'always'],
    'react/prop-types': ['error'],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-props-no-spreading': 'off',
    'object-curly-newline': 'off',
    'space-before-function-paren': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
