module.exports = {
  presets: [
    "@babel/preset-react", // optional: react: this resolves react-files (jsx, tsx)
    "@babel/preset-typescript", // allows  to use TypeScript
    [
      "@babel/preset-env", // compiles your js according with .browserslistrc
      {
        // requires for pollyfills: https://babeljs.io/docs/en/babel-preset-env#usebuiltins-usage
        useBuiltIns: "usage",
        corejs: { version: 3 },
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", // transforms static class properties as well as properties declared with the property initializer syntax
    "jsx-classnames-advanced", // optional: react: this resolves className={object}
  ],
};
