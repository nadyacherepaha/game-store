const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
    let commonConfig = common(env, argv);

    let result = merge(commonConfig, {
        mode: 'production',
        devtool: 'source-map',
        output: {
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].[contenthash:8].js'
        },
        optimization: {
            minimizer: [
                new TerserPlugin({ //speedest alternative of UglifyJS (it improves minifying js files)
                    terserOptions: {
                        test: /\.m?js(\?.*)?$/i,
                        chunkFilter: () => true,
                        warningsFilter: () => true,
                        extractComments: true,
                        sourceMap: true,
                        cache: true,
                        parallel: true,
                        terserOptions: {
                            output: {
                                comments: /^\**!|@preserve|@license|@cc_on/i
                            },
                            mangle: {
                                safari10: true //for preventing safari10 bugs
                            }
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({}) //it minifies css and optimize it with cssnano: https://cssnano.co/guides/optimisations
            ]
        },
        plugins: [ //additional config for plugins is placed in webpack.common.js
            new CompressionPlugin(), //it creates gzipped (compressed) files in '[path].gz[query]'
        ]
    });

    // console.warn("merge-prod-result:\r\n", result);
    return result;
};