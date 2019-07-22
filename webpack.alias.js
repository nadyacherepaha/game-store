const path = require("path");

const srcPath = path.resolve(__dirname, "./src/");

// MUST HAVE: sync aliases in .vscode/settings.json, jsconfig.json

module.exports = {
  "@": srcPath, // alias is '@/[name]' for js
  images: path.resolve(srcPath, "assets/images"), // alias is 'images/[name]' - for js or 'url(~/images/[name]) - for css
  fonts: path.resolve(srcPath, "assets/fonts") // alias is 'fonts/[name]' - for js or 'url(~/fonts/[name]) - for css
};
