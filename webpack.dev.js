const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

console.warn(common.entry);
module.exports = merge(common, {
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