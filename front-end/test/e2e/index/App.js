module.exports = {
  "Has app name as title": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("div")
      .assert.title("Hello World App")
      .end();
  },
  "Shows app name as header": function(browser) {
    browser
      .url(browser.launch_url)
      .waitForElementVisible("h1")
      .assert.containsText("h1", "Hello World App")
      .end();
  }
};
