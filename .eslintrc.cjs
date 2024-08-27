module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2023,
  },
  plugins: ['es-x'],
  rules: {
    'es-x/no-async-iteration': 'error',
    'es-x/no-malformed-template-literals': 'error',
    'es-x/no-regexp-lookbehind-assertions': ['off'],
    'es-x/no-regexp-named-capture-groups': 'error',
    'es-x/no-regexp-s-flag': ['warn'],
    'es-x/no-regexp-unicode-property-escapes': 'error',
    'no-constant-condition': ['off'],
    'no-useless-escape': ['off'],
    'no-case-declarations': ['off'],
    'no-unused-vars': ['warn'],
    'no-irregular-whitespace': ['off'],

    quotes: [2, 'single', { avoidEscape: true }],
    semi: ['error', 'never'],
  },
  settings: {
    'es-x': { aggressive: true },
  },
  ignorePatterns: ['dist/**/*.js', '**/*.test.js'],
}
