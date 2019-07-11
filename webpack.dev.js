const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (env, argv) => merge(common(env, argv), {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        stats: {
            children: false
        }
    },
    plugins: [
    ]
});