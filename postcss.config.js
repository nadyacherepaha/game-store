module.exports = { //browser target config see in .browserlistsrc
    plugins: {
        autoprefixer: {}, //it adds vendore prefixes ::placeholder => ::-webkit-input-placeholder, ::-moz-placeholder etc. https://github.com/postcss/autoprefixer
        "postcss-normalize": { //it adds normalize.css and sanitize.css
            forceImport: true,
            allowDuplicates: false
        }
    }
};