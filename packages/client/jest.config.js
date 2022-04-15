const { pathsToModuleNameMapper } = require('ts-jest');

const configs = require('../core/jest.config');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  ...configs,
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mock/file.js',
    '\\.(css|less)$': '<rootDir>/src/tests/mock/style.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' })
  }
};
