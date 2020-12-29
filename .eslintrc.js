module.exports = {
  env: {
    es2021: true,
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
