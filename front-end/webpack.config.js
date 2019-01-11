const path = require("path");
const webpack = require("webpack");
const babelConfig = require("./config/babel");

const env = process.env.NODE_ENV || "development";
const isProd = env === "production";

process.stderr.write(`Building with env = ${env}\n`);

const getGitRevision = function() {
  return process.env.GIT_COMMIT || "untracked";
};

const getNpmVersion = function() {
  return require("./package.json").version;
};

const out = path.resolve(__dirname, "dist");

const HTML = require("html-webpack-plugin");

const plugins = [
  new HTML({
    favicon: "src/assets/images/favicon.ico",
    template: "src/index.html"
  }),
  new webpack.DefinePlugin({
    "process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
    "process.env.NODE_ENV": JSON.stringify(env),
    __BUILD_IDENTIFIER__: JSON.stringify(getGitRevision()),
    __VERSION_NUMBER__: JSON.stringify(getNpmVersion())
  })
];

const Clean = require("clean-webpack-plugin");
const MiniCssExtract = require("mini-css-extract-plugin");

if (isProd) {
  plugins.push(
    new Clean([out]),
    new MiniCssExtract({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );
}

const entryPoints = function() {
  const items = isProd
    ? []
    : ["webpack-hot-middleware/client?noInfo=true&reload=true"];
  items.push(...arguments);
  return items;
};

const postcssLoader = {
  loader: "postcss-loader",
  options: {
    plugins: () => [require("autoprefixer"), require("cssnano")]
  }
};

module.exports = {
  mode: isProd ? "production" : "development",
  entry: {
    app: entryPoints("./src/index.js")
  },
  output: {
    path: out,
    filename: isProd ? "[name].[chunkhash].js" : "[name].[hash].js",
    publicPath: "./"
  },
  optimization: {
    minimize: isProd,
    namedModules: !isProd,
    noEmitOnErrors: !isProd,
    splitChunks: isProd && {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /.*/,
        include: path.resolve(__dirname, "src/assets"),
        options: {
          name: "[name]-[hash].[ext]"
        },
        loader: "file-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: babelConfig
      },
      { test: /\.yml$/, loader: "json-loader!yaml-loader" },
      {
        test: /\.scss$/,
        exclude: /shell.scss$/,
        use: [
          isProd ? MiniCssExtract.loader : "style-loader",
          isProd
            ? "css-loader?modules"
            : {
                loader: "css-loader",
                options: {
                  localIdentName: "[path][name]__[local]--[hash:base64:5]",
                  modules: true
                }
              },
          postcssLoader,
          "sass-loader"
        ]
      },
      {
        test: /shell.scss$/,
        use: [
          isProd ? MiniCssExtract.loader : "style-loader",
          "css-loader",
          postcssLoader,
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      config: path.resolve(__dirname, "./config"),
      spec: path.resolve(__dirname, "./test/spec")
    },
    symlinks: false
  },
  devtool: isProd ? undefined : "eval",
  plugins
};
