const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const PreloadPlugin = require('preload-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const path = require('path');
const srcPath = path.resolve(__dirname, "./src/");
const destPath = path.resolve(__dirname, "./build/"); //('../Api/wwwroot')
const publicPath = path.resolve(__dirname, "./public/");

module.exports = {
    stats: {
        children: false
    },
    entry: path.resolve(__dirname, srcPath, 'main.jsx'), //entyPoint for webpack
    output: {
        path: destPath,
        filename: "[name].js",
        publicPath: "/",
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }]
    },
    plugins: [
        /* config.plugin('define') */
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"', //TODO mode
                BASE_URL: '"/"'
            }
        }),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin({
            additionalTransformers: [
                error => {
                    if (error.webpackError) {
                        const message = typeof error.webpackError === 'string' ?
                            error.webpackError :
                            error.webpackError.message || ''
                        for (const {
                                re,
                                msg,
                                type
                            } of rules) {
                            const match = message.match(re)
                            if (match) {
                                return Object.assign({}, error, {
                                    // type is necessary to avoid being printed as defualt error
                                    // by friendly-error-webpack-plugin
                                    type,
                                    shortMessage: msg(error, match)
                                })
                            }
                        }
                        // no match, unknown webpack error without a message.
                        // friendly-error-webpack-plugin fails to handle this.
                        if (!error.message) {
                            return Object.assign({}, error, {
                                type: 'unknown-webpack-error',
                                shortMessage: message
                            })
                        }
                    }
                    return error
                }
            ],
            additionalFormatters: [
                errors => {
                    errors = errors.filter(e => e.shortMessage)
                    if (errors.length) {
                        return errors.map(e => e.shortMessage)
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(publicPath, "index.html"),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                collapseBooleanAttributes: true,
                removeScriptTypeAttributes: true
            },
        }),
        // new PreloadPlugin({
        //     rel: "preload",
        //     include: "initial",
        //     fileBlacklist: [/\.map$/, /hot-update\.js$/]
        // }),
        // new PreloadPlugin({
        //     rel: "prefetch",
        //     include: "asyncChunks"
        // }),
      
    ]
};