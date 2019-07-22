/* eslint-disable import/no-extraneous-dependencies */
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = (env, argv) =>
  merge(common(env, argv), {
    mode: "development",
    devtool: "cheap-module-eval-source-map"
  });
