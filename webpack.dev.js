/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = (env, argv) =>
  merge(common(env, argv), {
    mode: "development",
    devtool: "eval-cheap-module-source-map", // option controls how source maps are generated (affects on build speed dramatically): https://v4.webpack.js.org/configuration/devtool/
  });
