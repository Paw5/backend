module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'jest',
  ],
  rules: {
    'no-console': 'off',
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
  },
};
