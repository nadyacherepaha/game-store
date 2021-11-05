/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
// console.clear(); // TODO: watchFix => it doesn't work properly since VSCode-terminal has bug: https://github.com/microsoft/vscode/issues/75141
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
const browserslist = require("browserslist");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const srcPath = path.resolve(__dirname, "./src/");
const destPath = path.resolve(__dirname, "./build/"); // ('../Api/wwwroot')
const assetsPath = "./public";
const filesThreshold = 8196; // (bytes) threshold for compression, url-loader plugins

/* eslint-disable func-names */
module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? "development" : "production");
  const isDevMode = mode !== "production";

  process.env.NODE_ENV = mode; // it resolves issues in postcss.config.js (since Define plugin is loaded only after reading config-files)

  /** @type {import('webpack').Configuration} */
  const result = {
    stats: {
      children: false, // disable console.info for node_modules/*
      modules: false,
      errors: true,
      errorDetails: true,
    },
    // entryPoint for webpack; it can be object with key-value pairs for multibuild (https://webpack.js.org/concepts/entry-points/)
    entry: path.resolve(srcPath, "main.tsx"),

    output: {
      path: destPath,
      filename: "[name].js",
      chunkFilename: "[name].js",
      publicPath: "/", // url that should be used for providing assets
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"], // using import without file-extensions
      plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })], // plugin makes mapping from tsconfig.json to weback:alias
    },
    optimization: {
      // config is taken from vue-cli
      splitChunks: {
        // for avoiding duplicated dependencies across modules
        minChunks: 1, // Minimum number of chunks that must share a module before splitting.
        cacheGroups: {
          defaultVendors: {
            name: "chunk-vendors", // move js-files from node_modules into splitted file [chunk-vendors].js
            test: /[\\/]node_modules[\\/]/, // filtering files that should be included
            priority: -10, // a module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
            chunks: "initial", // type of optimization: [initial | async | all]
          },
          common: {
            name: "chunk-common", // move reusable nested js-files into splitted file [chunk-common].js
            minChunks: 2, // minimum number of chunks that must share a module before splitting
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true, // If the current chunk contains modules already split out from the main bundle, it will be reused instead of a new one being generated. This can impact the resulting file name of the chunk
          },
        },
      },
    },
    module: {
      rules: [
        // rule for js, jsx files
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            "babel-loader", // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserlistrc and babel.config.js files
            {
              loader: "ts-loader", // transpile *.ts to *.js, despite babel-loader deals with typeScript without restrictions but doesn't have .browserlist support
              options: {
                transpileOnly: true, // we don't type checking during the compilation - it's task for CodeEditor
              },
            },
            // optional: "ifdef-loader" // prodives conditinal compilation: https://github.com/nippur72/ifdef-loader
            // optional: "eslint-loader" //provides lint-errors into wepback output
          ],
        },
        // rule for ts, tsx files
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            "babel-loader", // transpile *.js, *.jsx, *.ts, *.tsx to result according to .browserlistrc and babel.config.js files
            // optional: "ifdef-loader" // prodives conditinal compilation: https://github.com/nippur72/ifdef-loader
            // optional: "eslint-loader" //provides lint-errors into wepback output
          ],
        },
        // rule for images
        {
          test: /\.(png|jpe?g|gif|webp)(\?.*)?$/, // optional: optimizing images via pngo etc.
          exclude: /(node_modules)/,
          use: [
            {
              loader: "url-loader", // it converts images that have size less 'limit' option into inline base64-css-format
              options: {
                name: "images/[name].[ext]",
                limit: filesThreshold, // if file-size more then limit, file-loader copies one into outputPath
                // by default it uses fallback: 'file-loader'
                // optional: fallback: 'responsive-loader' //it converts image to multiple images using srcset (IE isn't supported): https://caniuse.com/#search=srcset
              },
            },
          ],
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: "file-loader",
              // options: {
              //   name: "images/[hash]-[name].[ext]",
              // },
            },
          ],
        },
        // rule for svg-images

        // rule for fonts
        {
          test: /\.(woff2?|eot|f|otf)(\?.*)?$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: filesThreshold,
                name: "fonts/[name].[ext]", // if file-size more then limit, [file-loader] copies ones into outputPath
              },
            },
          ],
        },
        // rules for style-files
        {
          test: /\.css$/,
          include: path.join(__dirname, "src/components"),
          use: [
            "style-loader",
            {
              loader: "typings-for-css-modules-loader",
              options: {
                modules: true,
                namedExport: true,
              },
            },
          ],
        },
        {
          test: /\.css$|\.scss$/,
          use: [
            isDevServer
              ? "style-loader" // it extracts style directly into html (MiniCssExtractPlugin works incorrect with hmr and modules architecture)
              : MiniCssExtractPlugin.loader, // it extracts styles into file *.css
            // TODO: improve plugin for splitting by files for dev purpose
            {
              loader: "css-loader", // it interprets @import and url() like import/require() and it resolves them (you can use [import *.css] into *.js).
              options: {
                modules: {
                  auto: /\.module\.\w+$/, // enable css-modules option for files *.module*.
                  getLocalIdent: isDevMode
                    ? (loaderContext, _localIdentName, localName, options) => {
                        // it simplifies classNames fo debug purpose
                        const request = path
                          .relative(options.context || "", loaderContext.resourcePath)
                          .replace(`src${path.sep}`, "")
                          .replace(".module.css", "")
                          .replace(".module.scss", "")
                          .replace(/\\|\//g, "-")
                          .replace(/\./g, "_");
                        return `${request}__${localName}`;
                      }
                    : MinifyCssNames(
                        // minify classNames for prod-build
                        { excludePattern: /[_dD]/gi } // exclude '_','d','D' because Adblock blocks '%ad%' classNames
                      ),
                },
              },
            },
            {
              loader: "sass-loader", // it compiles Sass to CSS, using Node Sass by default
              options: {
                additionalData: '@import "variables";', // inject this import by default in each scss-file
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "src/styles")], // using pathes as root
                },
              },
            },
            "postcss-loader", // it provides adding vendor prefixes to CSS rules using values from Can I Use (see postcss.config.js in the project)
          ],
        },
      ],
    },
    plugins: [
      new webpack.WatchIgnorePlugin({ paths: [/\.d\.ts$/] }), // ignore d.ts files in --watch mode
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }), // it adds force-ignoring unused parts of modules like moment/locale/*.js
      new webpack.DefinePlugin({
        // it adds custom Global definition to the project like BASE_URL for index.html
        "process.env": {
          NODE_ENV: JSON.stringify(mode),
          BASE_URL: '"/"',
        },
        "global.DEV": JSON.stringify(isDevMode),
        "global.DEBUG": JSON.stringify(false),
        "global.VERBOSE": JSON.stringify(false),
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
              removeScriptTypeAttributes: true,
            },
      }),
      // todo: watchFix for update to webpack5: https://github.com/GoogleChromeLabs/preload-webpack-plugin/issues/132
      new PreloadPlugin({
        // it adds 'preload' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
        rel: "preload",
        include: "initial",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /obsolete\.js$/],
      }),
      new PreloadPlugin({
        // it adds 'prefetch' tag for async js-files: https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ
        rel: "prefetch",
        include: "asyncChunks",
      }),
      new MiniCssExtractPlugin({
        // it extracts css-code from js into splitted file
        filename: isDevMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contenthash].css",
      }),
      new CleanPlugin.CleanWebpackPlugin(), // it cleans output folder before extracting files
      // it copies files like images, fonts etc. from 'public' path to 'destPath' (since not every file will be injected into css and js)
      new CopyWebpackPlugin({
        patterns: [
          {
            from: assetsPath,
            to: destPath,
            toType: "dir",
          },
        ],
      }),
      new webpack.ProgressPlugin(), // it shows progress of building
      new webpack.ProvidePlugin({
        React: "react", // optional: react. it adds [import React from 'react'] as ES6 module to every file into the project
      }),
      new ObsoleteWebpackPlugin({
        // optional: browser: provides popup via alert-script if browser unsupported (according to .browserlistrc)
        name: "obsolete",
        promptOnNonTargetBrowser: true, // show popup if browser is not listed in .browserlistrc
        // optional: browser: [template: 'html string here']
      }),
      new ScriptExtHtmlWebpackPlugin({
        // it adds to obsolete-plugin-script 'async' tag (for perfomance puprpose)
        async: "obsolete",
      }),
      // optional: new BundleAnalyzerPlugin() // creates bundles-map in browser https://github.com/webpack-contrib/webpack-bundle-analyzer
    ],
  };

  return result;
};

module.exports.filesThreshold = filesThreshold;
module.exports.assetsPath = assetsPath;
