const config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/jest.config.js',
    '!**/coverage/**',
  ],
  // coverageThreshold: {
  //   global: {
  //     functions: 90,
  //     statements: -10,
  //   },
  // },
};

module.exports = config;
