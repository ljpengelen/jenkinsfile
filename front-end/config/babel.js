const plugins = [
  "@babel/plugin-proposal-json-strings",
  ["@babel/transform-react-jsx", { pragma: "h" }]
];

if (process.env.NODE_ENV === "test") {
  plugins.push(["istanbul", { exclude: "test" }]);
}

module.exports = {
  presets: [
    [
      "@babel/env",
      {
        corejs: "2",
        loose: true,
        modules: false,
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins
};
