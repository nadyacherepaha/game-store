const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        chunkFilename: '[name].js',
        publicPath: "/",
        globalObject: "(typeof self !== 'undefined' ? self : this)"
    },
    optimization: {
        splitChunks: {
            minChunks: 1,
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
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                oneOf: [
                    /* config .oneOf('normal-modules') - rule for [name].module.css files - rule for css-modules*/
                    {
                        test: /\.module\.\w+$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: {
                                        localIdentName: '[path][name]__[local]--[hash:base64:5]'
                                    },
                                }
                            },
                            'postcss-loader'
                        ]
                    },
                    /* config .oneOf('normal') */
                    {
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'postcss-loader'
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        /* config.plugin('define') */
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"development"', //TODO: mode
                BASE_URL: '"/"'
            }
        }),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css', //TODO: devMode ? '[name].css' : '[name].[contenthash].css',
            chunkFilename: '[id].css' //TODO: devMode ? '[id].css' : '[id].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(publicPath, "index.html"),
            //TODO: minify for prod
        }),
        new PreloadPlugin({
            rel: "preload",
            include: "initial",
            fileBlacklist: [/\.map$/, /hot-update\.js$/]
        }),
        new PreloadPlugin({
            rel: "prefetch",
            include: "asyncChunks"
        })
    ]
};