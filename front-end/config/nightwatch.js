const chromedriver = require("chromedriver");

module.exports = {
  src_folders: ["./test/e2e"],
  output_folder: "reports",
  webdriver: {
    start_process: true,
    server_path: chromedriver.path,
    log_path: "reports",
    port: 9515
  },
  test_settings: {
    default: {
      launch_url: `http://localhost:${process.env.SERVER_PORT || 9091}/`,
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--headless"]
        }
      },
      globals: {
        waitForConditionTimeout: 5000
      }
    },
    ci: {
      desiredCapabilities: {
        browserName: "chrome",
        chromeOptions: {
          args: ["--no-sandbox", "--headless"]
        }
      }
    }
  }
};
