const merge = require('webpack-merge');
const dev = require('./webpack.dev.js');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    let devConfig = dev(env, argv);
    //remove plugins since these aren't required for devServer
    devConfig.plugins.splice(devConfig.plugins.findIndex(a => a instanceof CleanPlugin.CleanWebpackPlugin), 1); 
    devConfig.plugins.splice(devConfig.plugins.findIndex(a => a instanceof CopyWebpackPlugin), 1);

    let result = merge(devConfig, {
        devServer: {
            historyApiFallback: true,
            stats: {
                children: false
            }
        }
    });

    return result;
};