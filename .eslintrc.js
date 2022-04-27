const tsConfig = require('./packages/core/tsconfig.json');

module.exports = {
  extends: 'wnyao',
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  ignorePatterns: tsConfig.exclude
};
