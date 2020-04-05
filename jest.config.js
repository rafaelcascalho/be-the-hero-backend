module.exports = {
  modulePathIgnorePatterns: ['./src/__tests__/factories'],
  setupFiles: ['jest-plugin-context/setup'],
  coverageReporters: ['json', 'json-summary', 'text', 'lcov'],
};
