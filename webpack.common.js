/* eslint-disable import/no-extraneous-dependencies */
// console.clear(); // TODO: watchFix => it doesn't work properly since webpack has bug: https://github.com/webpack/webpack/issues/9442
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const PreloadPlugin = require("preload-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MinifyCssNames = require("mini-css-class-name/css-loader");
const ObsoleteWebpackPlugin = require("obsolete-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const path = require("path");

const pathAlias = require("./webpack.alias");

const srcPath = path.resolve(__dirname, "./src/");
const destPath = path.resolve(__dirname, "./build/"); // ('../Api/wwwroot')
const assetsPath = path.resolve(__dirname, "./public/");
const filesThreshold = 8196; // (bytes) threshold for compression, url-loader plugins
let enableSourceMap = false;

/* eslint-disable func-names */
module.exports = function(env, argv) {
  const isDevServer = argv.$0.indexOf("webpack-dev-server") !== -1;
  const mode = argv.mode || (isDevServer ? "development" : "production");
  const isDevMode = mode !== "production";

  enableSourceMap = argv.sourceMap != null; // it adds source map for css and js
  module.exports.enableSourceMap = enableSourceMap;

  process.env.NODE_ENV = mode; // it resolves issues in postcss.config.js (since Define plugin is loaded only after reading config-files)
  const result = {
    stats: {
      children: false // disable console.info for node_modules/*
    },
    entry: path.resolve(srcPath, "main.jsx"), // entyPoint for webpack
    output: {
      path: destPath,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/"
    },
    resolve: {
      alias: pathAlias,
      extensions: [".js", ".jsx", ".scss"]
    },
    optimization: {
      splitChunks: {
        minChunks: 1,
        cacheGroups: {
          vendors: {
            name: "chunk-vendors", // move js-files from node_modules into splitted file [chunk-vendors].js
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial"
          },
          common: {
            name: "chunk-common", // move reusable nested js-files into splitted file [chunk-common].js
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true
          }
        }
      }
    },
    module: {
      rules: [
        {
          // rule for js, jsx files
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"] // babel-loader: transpile *.js, **.jsx to result according to .browserlistsrc and babel.config.js files
          // optional: you can add 'eslint-loader' for providing lint-errors into wepback output
        },
        // rule for images
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, // TODO: optimizing images
          exclude: /(node_modules)/,
          use: [
            {
              loader: "url-loader", // it converts images that have size less 'limit' option into inline base64-css-format
              options: {
                name: "images/[name].[ext]",
                limit: filesThreshold // if file-size more then limit, file-loader copies one into outputPath
                // by default it uses fallback: 'file-loader'
                // TODO: add fallback: 'responsive-loader' //it converts image to multiple images using srcset (IE isn't supported): https://caniuse.com/#search=srcset
              }
            }
          ]
        },
        // rule for svg-images
        {
          test: /\.(svg)(\?.*)?$/, // for reducing file-size: OptimizeCSSAssetsPlugin > cssnano > SVGO, that congigured in webpack.prod.js
          exclude: /(node_modules)|(fonts\\.+\.svg)(\?.*)?/,
          use: [
            {
              loader: "svg-url-loader", // despite url-loader that converts images into base64 format it converts images to native svg-css format
              options: {
                limit: filesThreshold,
                name: "images/[name].[ext]" // if file-size more then limit, [file-loader] copies ones into outputPath
              }
            }
          ]
        },
        // rule for fonts
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: filesThreshold,
                name: "fonts/[name].[ext]" // if file-size more then limit,  [file-loader] copies ones into outputPath
              }
            }
          ]
        },
        // special rule for fonts in svg-format
        {
          test: /(fonts\\.+\.svg)(\?.*)?$/i, // for reducing file-size: OptimizeCSSAssetsPlugin > cssnano > SVGO, that congigured in webpack.prod.js
          use: [
            {
              loader: "svg-url-loader", // despite url-loader that converts images into base64 format it converts images to native svg-css format
              options: {
                limit: filesThreshold,
                name: "fonts/[name].[ext]" // if file-size more then limit,  [file-loader] copies ones into outputPath
              }
            }
          ]
        },
        {
          // rules for style-files
          test: /\.css$|\.scss$/,
          oneOf: [
            /* config .oneOf('normal-modules') - rule for [name].module.css files - rule for css-modules */
            {
              test: /\.module\.\w+$/,
              use: [
                isDevServer
                  ? "style-loader" // it extracts style directly into html (MiniCssExtractPlugin works incorrect with hmr and modules architecture)
                  : MiniCssExtractPlugin.loader, // it extracts styles into file *.css
                // TODO: improve plugin for splitting by files for dev purpose
                {
                  loader: "css-loader", // it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
                  options: {
                    modules: {
                      getLocalIdent: isDevMode
                        ? (
                            loaderContext,
                            _localIdentName,
                            localName,
                            options
                          ) => {
                            // it simplifies classNames fo debug purpose
                            const request = path
                              .relative(
                                options.context || "",
                                loaderContext.resourcePath
                              )
                              .replace("src\\", "")
                              .replace(".module.css", "")
                              .replace(".module.scss", "")
                              .replace(/\\/g, "-")
                              .replace(/\./g, "_");
                            return `${request}__${localName}`;
                          }
                        : MinifyCssNames(
                            // minify classNames for prod-build
                            { excludePattern: /[_dD]/gi } // exclude '_','d','D' because Adblock blocks '%ad%' classNames
                          )
                    }
                  }
                },
                {
                  loader: "sass-loader", // it compiles Sass to CSS, using Node Sass by default
                  options: {
                    prependData: '@import "variables";', // inject this import by default in each scss-file
                    sassOptions: {
                      includePaths: [path.resolve(__dirname, "src/styles")]
                    }
                  }
                },
                "postcss-loader" // it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)
              ]
            },
            /* config .oneOf('normal') */
            {
              use: [
                isDevServer
                  ? "style-loader" // it extracts style directly into html (MiniCssExtractPlugin works incorrect with hmr and modules architecture)
                  : MiniCssExtractPlugin.loader, // it extracts styles into file *.css
                "css-loader", // it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
                {
                  loader: "sass-loader", // it compiles Sass to CSS, using Node Sass by default
                  options: {
                    prependData: '@import "variables";', // inject this import by default in each scss-file
                    sassOptions: {
                      includePaths: [path.resolve(__dirname, "src/styles")]
                    }
                  }
                },
                "postcss-loader" // it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)
              ]
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // it adds force-ignoring unused parts of modules like moment/locale/*.js
      new webpack.DefinePlugin({
        // it adds custom Global definition to the project like BASE_URL for index.html
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
          BASE_URL: '"/"'
        }
      }),
      new CaseSensitivePathsPlugin(), // it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
      new FriendlyErrorsWebpackPlugin(), // it provides user-friendly errors from webpack (since the last has ugly useless bug-report)
      new HtmlWebpackPlugin({
        // it creates *.html with injecting js and css into template
        template: path.resolve(srcPath, "index.html"),
        minify: isDevMode
          ? false
          : {
              removeComments: true,
              collapseWhitespace: true,
              removeAttributeQuotes: true,
              collapseBooleanAttributes: true,
              removeScriptTypeAttributes: true
            }
      }),
      new PreloadPlugin({
        // it adds 'preload' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /obsolete\.js$/]
      }),
      new PreloadPlugin({
        // it adds 'prefetch' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
        rel: "prefetch",
        include: "asyncChunks"
      }),
      new MiniCssExtractPlugin({
        // it extracts css-code into different file
        filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contenthash].css",
        sourceMap: enableSourceMap
      }),
      new CleanPlugin.CleanWebpackPlugin(), // it cleans output folder before extracting files
      new CopyWebpackPlugin([
        {
          // it copies files like images, fonts etc. from 'public' path to 'destPath' (since not every file will be injected into css and js)
          from: assetsPath,
          to: destPath,
          toType: "dir",
          ignore: [".DS_Store"]
        }
      ]),
      new webpack.ProgressPlugin(), // it shows progress of building
      new webpack.ProvidePlugin({
        React: "react" // optional: react. it adds [import React from 'react'] as ES6 module to every file into the project
      }),
      new ObsoleteWebpackPlugin({
        // optional: browser: provides popup via aler-script if browser unsupported (according to .browserlistrc)
        name: "obsolete",
        promptOnNonTargetBrowser: true
        // optional: browser: [template: 'html string here']
      }),
      new ScriptExtHtmlWebpackPlugin({
        // it adds to obsole-plugin-script 'async' tag (for perfomance puprpose)
        async: "obsolete"
      })
    ]
  };

  return result;
};

module.exports.filesThreshold = filesThreshold;
