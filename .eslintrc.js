module.exports = {
  extends: ['@yunyeji/eslint-config-react'],
  root: true,
  ignorePatterns: ['dist/', 'node_modules/', 'build/', 'coverage/'],
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
