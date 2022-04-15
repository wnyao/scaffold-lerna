module.exports = {
  verbose: true,
  reporters: ['default'],
  coverageDirectory: '.',
  testMatch: ['**/src/tests/**', '!**/mock/*'],
  transform: {
    '^.+\\.(j|t)s?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleDirectories: ['node_modules', 'src'],

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'jest-environment-jsdom'
};
