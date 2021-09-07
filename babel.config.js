module.exports = {
  presets: [
    "@babel/preset-react", // optional: react: this resolves react-files (jsx, tsx)
    "@babel/preset-typescript", // allows  to use TypeScript
    "@babel/preset-env", // compiles your js according with .browserslistrc
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", // transforms static class properties as well as properties declared with the property initializer syntax
    "jsx-classnames-advanced", // optional: react: this resolves className={object}
  ],
};
