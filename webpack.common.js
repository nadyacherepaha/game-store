const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const PreloadPlugin = require('preload-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const srcPath = path.resolve(__dirname, "./src/");
const destPath = path.resolve(__dirname, "./build/"); //('../Api/wwwroot')
const assetsPath = path.resolve(__dirname, "./public/");
const filesThreshold = 8196; //(bytes) threshold for compression, url-loader plugins

module.exports = function(_env, argv) {
    const isDevServer = argv['$0'].indexOf('webpack-dev-server') !== -1;
    const mode = argv.mode || (isDevServer ? 'development' : 'production');
    const isDevMode = mode !== 'production';

    process.env.NODE_ENV = mode; //it resolves issues in postcss.config.js (since Define plugin is loaded only after reading config-files)

    let result = {
        stats: {
            children: false //disable console.info for node_modules/*
        },
        entry: path.resolve(__dirname, srcPath, 'main.jsx'), //entyPoint for webpack
        output: {
            path: destPath,
            filename: "[name].js",
            chunkFilename: "[name].js",
            publicPath: "/",
        },
        resolve: {
            alias: {
                '@': srcPath, //alias is '@/[name]' for js
                images: path.resolve(srcPath, 'images') //alias is 'images/[name]' - for js or 'url(~/images/[name]) - for css
            }
        },
        optimization: {
            splitChunks: {
                minChunks: 1,
                cacheGroups: {
                    vendors: {
                        name: 'chunk-vendors', //move js-files from node_modules into splitted file [chunk-vendors].js
                        test: /[\\\/]node_modules[\\\/]/,
                        priority: -10,
                        chunks: 'initial'
                    },
                    common: {
                        name: 'chunk-common', //move reusable nested js-files into splitted file [chunk-common].js
                        minChunks: 2,
                        priority: -20,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        },
        module: {
            rules: [{ //rule for js, jsx files
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader" //transpile *.js, **.jsx to result according to .browserlistsrc and babel.config.js files
                    }
                },
                //rule for images
                {
                    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, //TODO: optimizing images
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'url-loader', //it converts images that have size less 'limit' option into inline base64-css-format
                        options: {
                            name: 'images/[name].[ext]',
                            limit: filesThreshold //if file-size more then limit, file-loader copies one into outputPath
                                //by default it uses fallback: 'file-loader'
                                //TODO: add fallback: 'responsive-loader' //it converts image to multiple images using srcset (IE isn't supported): https://caniuse.com/#search=srcset
                        }
                    }]
                },
                //rule for svg-images
                {
                    //TODO: exclude for fonts
                    test: /\.(svg)(\?.*)?$/, //for reducing file-size: OptimizeCSSAssetsPlugin > cssnano > SVGO, that congigured in webpack.prod.js
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'svg-url-loader?limit=20000&name=images/[name].[ext]', //despite url-loader that converts images into base64 format it converts images to native svg-css format
                        options: {
                            limit: filesThreshold,
                            name: 'images/[name].[ext]' //if file-size more then limit, file-loader copies one into outputPath
                                //by default it uses => fallback: 'file-loader'
                                //TODO: add fallback: 'responsive-loader' //it converts image to multiple images using srcset (IE isn't supported): https://caniuse.com/#search=srcset
                        }
                    }]
                },
                { //rules for style-files
                    test: /\.css$|\.scss$/,
                    oneOf: [
                        /* config .oneOf('normal-modules') - rule for [name].module.css files - rule for css-modules*/
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                isDevServer ?
                                'style-loader' : //it extracts style dircetly into html (MiniCssExtractPlugin works incorrect with hmr and modules architecture)
                                MiniCssExtractPlugin.loader, //it extracts styles into file *.css
                                //TODO: improve plugin for splitting by files for dev purpose
                                {
                                    loader: 'css-loader', //it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
                                    options: {
                                        modules: {
                                            getLocalIdent: (loaderContext, _localIdentName, localName, options) => { //TODO: minify classNames for prod-build
                                                const request = path.relative(options.context || "", loaderContext.resourcePath)
                                                    .replace(/\\/g, '_')
                                                    .replace(/\./g, '-');
                                                return `${request}__${localName}`;
                                            }
                                        },
                                    }
                                },
                                {
                                    loader: "sass-loader", //it compiles Sass to CSS, using Node Sass by default
                                    options: {
                                        data: '@import "variables";',
                                        includePaths: [path.resolve(__dirname, "src/styles")],
                                    }
                                },
                                'postcss-loader' //it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)

                            ]
                        },
                        /* config .oneOf('normal') */
                        {
                            use: [{
                                    loader: MiniCssExtractPlugin.loader, //it extracts styles into file *.css
                                    options: {
                                        hmr: isDevServer, //Hot Module Replacement - hot update of the page by changing css
                                        //reloadAll: true //uncomment if hmr works incorectly
                                    },
                                },
                                'css-loader', //it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
                                {
                                    loader: "sass-loader", //it compiles Sass to CSS, using Node Sass by default
                                    options: {
                                        data: '@import "variables";',
                                        includePaths: [path.resolve(__dirname, "src/style")],
                                    }
                                },
                                'postcss-loader' //it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)
                            ]
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //it adds force-ignoring unused parts of modules like moment/locale/*.js
            new webpack.DefinePlugin({ //it adds custom Global definition to the project like BASE_URL for index.html
                "process.env": {
                    NODE_ENV: JSON.stringify(mode),
                    BASE_URL: '"/"'
                }
            }),
            new CaseSensitivePathsPlugin(), //it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
            new FriendlyErrorsWebpackPlugin(), //it provides user-friendly errors from webpack (since the last has ugly useless bug-report)
            new HtmlWebpackPlugin({ //it creates *.html with injecting js and css into template
                template: path.resolve(srcPath, "index.html"),
                minify: isDevMode ? false : {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true
                }
            }),
            new PreloadPlugin({ //it adds 'preload' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
                rel: "preload",
                include: "initial",
                fileBlacklist: [/\.map$/, /hot-update\.js$/]
            }),
            new PreloadPlugin({ //it adds 'prefetch' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
                rel: "prefetch",
                include: "asyncChunks"
            }),
            new MiniCssExtractPlugin({
                filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
                chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
            }),
            new CleanPlugin.CleanWebpackPlugin(),
            new CopyWebpackPlugin([{ //it copies files like images, fonts etc. from 'public' path 'destPath' (since not every file will be injected into css and js)
                from: assetsPath,
                to: destPath,
                toType: "dir",
                ignore: [".DS_Store"]
            }])
        ]
    };

    return result;
};

module.exports.filesThreshold = filesThreshold;