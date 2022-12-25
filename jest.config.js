const config = {
  verbose: true,
  setupFilesAfterEnv: ['./jest-setup-files-after-env.js'],
  modulePathIgnorePatterns: [
    ".*__mocks__.*"
  ]
};

if (process.env.CI) {
  Object.assign(config, {
    testResultsProcessor:
      './jest-json-reporter.js',
    reporters: [],
  });
}

module.exports = config;
