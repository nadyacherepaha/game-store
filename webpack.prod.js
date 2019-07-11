const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [{
            options: {
                test: /\.m?js(\?.*)?$/i,
                chunkFilter: () => true,
                warningsFilter: () => true,
                extractComments: false,
                sourceMap: true,
                cache: true,
                cacheKeys: defaultCacheKeys => defaultCacheKeys,
                parallel: true,
                include: undefined,
                exclude: undefined,
                minify: undefined,
                terserOptions: {
                    output: {
                        comments: /^\**!|@preserve|@license|@cc_on/i
                    },
                    compress: {
                        arrows: false,
                        collapse_vars: false,
                        comparisons: false,
                        computed_props: false,
                        hoist_funs: false,
                        hoist_props: false,
                        hoist_vars: false,
                        inline: false,
                        loops: false,
                        negate_iife: false,
                        properties: false,
                        reduce_funcs: false,
                        reduce_vars: false,
                        switches: false,
                        toplevel: false,
                        typeofs: false,
                        booleans: true,
                        if_return: true,
                        sequences: true,
                        unused: true,
                        conditionals: true,
                        dead_code: true,
                        evaluate: true
                    },
                    mangle: {
                        safari10: true
                    }
                }
            }
        }],
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\\/]node_modules[\\\/]/,
                    priority: -10,
                    chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                    minChunks: 2,
                    priority: -20,
                    chunks: 'initial',
                    reuseExistingChunk: true
                }
            }
        }
    },
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