const config = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/jest.config.js',
    '!**/coverage/**',
  ],
  coverageThreshold: {
    global: {
      functions: 1,
    },
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./tests/setup'],
  globalTeardown: './tests/teardown.js',
};

export default config;
