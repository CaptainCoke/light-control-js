module.exports = {
  env: {
    es2021: true,
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    'import/resolver': 'node',
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 'off',
  },
};
