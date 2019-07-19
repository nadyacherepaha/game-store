const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    let devConfig = dev(env, argv);
    //remove plugins since these aren't required for devServer
    devConfig.plugins.splice(devConfig.plugins.findIndex(a => a instanceof CleanPlugin.CleanWebpackPlugin), 1);
    devConfig.plugins.splice(devConfig.plugins.findIndex(a => a instanceof CopyWebpackPlugin), 1);
    devConfig.plugins.splice(devConfig.plugins.findIndex(a => a instanceof MiniCssExtractPlugin), 1);

    let result = merge(devConfig, {
        devServer: {
            historyApiFallback: {
                rewrites: [
                    { from: /favicon.ico/, to: 'public/favicon.ico' } // show favicon
                ]
            }, //it enables HTML5 mode: https://developer.mozilla.org/en-US/docs/Web/API/History
            stats: {
                children: false //disable console.info for node_modules/*
            }
        }
    });

    return result;
};