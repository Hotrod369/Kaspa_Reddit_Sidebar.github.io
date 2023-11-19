/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    ecmaVersion: 2022, // Adjust the version as needed
    sourceType: 'module', // Use 'module' for ES modules, 'script' for CommonJS
  },
};
