/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require("webpack-merge");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require("./webpack.common");

module.exports = (env, argv) => {
  const commonConfig = common(env, argv);

  /** @type {import('webpack').Configuration} */
  const extendedConfig = {
    mode: "production",
    devtool: argv.sourceMap != null ? "source-map" : false, // option controls how source maps are generated (affects on build speed dramatically): https://v4.webpack.js.org/configuration/devtool/
    output: {
      filename: "[name].[contenthash:8].js", // contenthash-this is version for avoding browser-cache issue: user always has to get the last version of files
      chunkFilename: "[name].[contenthash:8].js",
    },
    performance: {
      assetFilter: function assetFilter(assetFilename) {
        return !/(\.map$)|(fonts)|(images)/.test(assetFilename); // ignore these files from perfomance-hints
      },
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          // default webpack plugin for js-optimization which should be configured: https://v4.webpack.js.org/configuration/optimization/#optimizationminimizer
          // speedest alternative of UglifyJS (it improves minifying js files)
          test: /\.m?js(\?.*)?$/i,
          // exclude: /\.m?js(\?.*)?$/i, // uncomment if we don't need uglifying (for debug purpose)
          extractComments: false, // disable extracting comments to a different file
          terserOptions: {
            toplevel: true, // https://github.com/terser/terser#minify-options
            output: {
              comments: false, // remove comments from files
            },
            mangle: {
              safari10: true, // for preventing Safari 10/11 bugs in loop scoping and await
            },
            compress: { pure_funcs: ["console.info", "console.debug", "console.warn"] }, // remove this functions when their return values are not used
          },
        }),
        new OptimizeCSSAssetsPlugin({}), // it minifies css and optimize it with cssnano: https://cssnano.co/guides/optimisations
      ],
    },
    plugins: [
      // additional config for plugins is placed in webpack.common.js
      new CompressionPlugin({
        // optional: it creates gzipped (compressed) files in '[path].gz[query]'
        threshold: common.filesThreshold, // (bytes). Only assets bigger than this size are processed
      }),
    ],
  };

  return merge(commonConfig, extendedConfig);
};
