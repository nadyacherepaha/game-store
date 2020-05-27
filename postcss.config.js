module.exports = {
  // browser target config see in .browserlistsrc
  parser: "postcss-scss",
  plugins: {
    autoprefixer: {}, // it adds vendor prefixes ::placeholder => ::-webkit-input-placeholder, ::-moz-placeholder etc. https://github.com/postcss/autoprefixer
    "postcss-normalize": {
      // it adds normalize.css and sanitize.css. https://github.com/csstools/postcss-normalize
      // forceImport: true, //it adds twice
      allowDuplicates: false,
    },
  },
};
