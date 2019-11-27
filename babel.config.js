module.exports = {
  presets: [
    "@babel/preset-env", // allows you to use the latest JavaScript
    "@babel/preset-react" // optional: react: this resolves react-files (jsx, tsx)
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties", // transforms static class properties as well as properties declared with the property initializer syntax
    "jsx-classnames-advanced" // optional: react: this resolves className={object}
  ]
};
