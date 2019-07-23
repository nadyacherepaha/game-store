const pathAlias = require("./webpack.alias");

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  env: {
    node: true,
    browser: true
  },
  plugins: ["json"],
  rules: {
    "max-len": [
      "error",
      {
        code: 300
      }
    ],
    "react/destructuring-assignment": 0
  },
  settings: {
    "import/resolver": {
      alias: {
        map: Object.keys(pathAlias).map(key => [key, pathAlias[key]])
      }
    }
  }
};
