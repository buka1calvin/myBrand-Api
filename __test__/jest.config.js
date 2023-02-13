export default {
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    coverageDirectory: 'coverage',
    collectCoverage: true,
    transform: {
      '^.+\\.js$': 'babel-jest'
    },
  };