/* eslint-disable import/no-extraneous-dependencies */
const merge = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = (env, argv) => {
  const commonConfig = common(env, argv);

  const result = merge(commonConfig, {
    mode: "production",
    devtool: common.enableSourceMap ? "source-map" : "none",
    output: {
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].js"
    },
    performance: {
      assetFilter: function assetFilter(assetFilename) {
        return !/(\.map$)|(fonts)|(images)/.test(assetFilename);
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          // speedest alternative of UglifyJS (it improves minifying js files)
          test: /\.m?js(\?.*)?$/i,
          chunkFilter: () => true,
          warningsFilter: () => true,
          extractComments: false, // remove comments from js
          sourceMap: common.enableSourceMap,
          cache: true,
          parallel: true,
          terserOptions: {
            mangle: {
              safari10: true // for preventing safari10 bugs
            }
          }
        }),
        new OptimizeCSSAssetsPlugin({}) // it minifies css and optimize it with cssnano: https://cssnano.co/guides/optimisations
      ]
    },
    plugins: [
      // additional config for plugins is placed in webpack.common.js
      new CompressionPlugin({
        // it creates gzipped (compressed) files in '[path].gz[query]'
        threshold: common.filesThreshold // (bytes). Only assets bigger than this size are processed
      })
    ]
  });

  // console.warn("merge-prod-result:\r\n", result);
  return result;
};
