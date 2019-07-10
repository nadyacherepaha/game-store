const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    plugins: [
        new CopyWebpackPlugin([{
            from: publicPath,
            to: destPath,
            toType: "dir",
            ignore: [".DS_Store"]
        }]),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new CompressionPlugin()
    ]
});