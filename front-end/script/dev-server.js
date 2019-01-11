#!/usr/bin/env node

const serverPort = process.env.SERVER_PORT || 9090;

const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");

const config = require("../webpack.config.js");
const compiler = webpack(config);
const app = express();

app.use(
  devMiddleware(compiler, {
    publicPath: "/",
    stats: "minimal"
  })
);

app.use(
  hotMiddleware(compiler, {
    publicPath: "/"
  })
);

const server = app.listen(serverPort, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server listening on http://localhost:${serverPort}`);
});

module.exports = server;
