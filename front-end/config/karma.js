const webpackConfig = require("../webpack.config.js");

module.exports = function(config) {
  config.set({
    basePath: "../",
    frameworks: ["mocha", "chai-dom", "chai", "sinon"],
    files: [
      {
        pattern: "test/spec/spec_helper.js",
        watched: false
      },
      {
        pattern: "test/spec/all_specs.js",
        watched: false
      }
    ],
    preprocessors: {
      "test/spec/*.js": ["webpack"]
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: "minimal"
    },
    reporters: ["mocha", "coverage"],
    client: {
      captureConsole: true,
      mocha: {
        reporter: "html"
      }
    },
    mochaReporter: {
      showDiff: true
    },
    coverageReporter: {
      dir: "coverage",
      reporters: [{ type: "text-summary" }, { type: "html" }]
    },
    listenAddress: "localhost",
    hostname: "localhost",
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      }
    },
    concurrency: 1
  });
};
