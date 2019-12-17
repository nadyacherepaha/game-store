const path = require("path");

const srcPath = path.resolve(__dirname, "./src/");

// MUST HAVE: sync aliases in .vscode/settings.json, tsconfig.json

module.exports = {
  "@": srcPath, // alias is '@/[name]' for js
  images: path.resolve(srcPath, "assets/images"), // alias is 'images/[name]' - for js or 'url(~/images/[name]) - inside css-modules
  fonts: path.resolve(srcPath, "assets/fonts") // alias is 'fonts/[name]' - for js or 'url(~/fonts/[name]) - inside css-modules
};
