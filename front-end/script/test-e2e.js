#!/usr/bin/env node

const child_process = require("child_process");

const server = require("./dev-server.js");

const testOptions = process.argv.slice(2);
const testRunner = child_process.spawn(
  "./node_modules/.bin/nightwatch",
  ["-c", "config/nightwatch.js", ...testOptions],
  { stdio: "inherit", env: process.env }
);

testRunner.on("exit", function(code) {
  server.close();
  process.exit(code);
});

testRunner.on("error", function(err) {
  console.error(err);
  server.close();
  process.exit(1);
});
