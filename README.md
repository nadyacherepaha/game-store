# WebpackMustHave

## Info

Webpack version: 4.41.3

## How to run project

1. Open project in VSCode (for example)
2. Run command `npm i` in terminal (console) for installing all required packages (Node.js is required: <https://nodejs.org/en/>)
3. For builing project you can use the following commands:
   - `npm run build-prod` - building production version (minimized and optimized). The project will be builded into `build` folder. You can change destination in `webpack.common.js (line 19)`
   - `npm run build-dev` - building development version
   - `npm run serve` - building development hot-reloaded version with webpack-dev-server

## Recommended VSCode extensions

- CSS Modules: <https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules>
- CSS Modules Syntax Highlighter: <https://marketplace.visualstudio.com/items?itemName=andrewleedham.vscode-css-modules>
- ESlint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
- Stylelint: <https://marketplace.visualstudio.com/items?itemName=thibaudcolas.stylelint>
- SCSS intellisense: <https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss>
- Path intellisense: <https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense>
- Prettier - Code formatter: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Import Cost: <https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost>

## TODO. Issues

- add webpack-mock-server (with hot-replacement and ts-support)
- fix peek-to-definition (for none-js-files): <https://github.com/microsoft/TypeScript/issues/15146>
- replace Prettier by better alternative (Prettier works bad)
- simplify config for webpack.styles when css-loader will be updated: <https://github.com/webpack-contrib/css-loader/issues/994>
- add icomoon to fonts
- find solution for .browserslistrc and stylelint integration
- Eslint. Add tslint integration (impossible to use with babel-eslint): <https://github.com/typescript-eslint/typescript-eslint#what-about-babel-and-babel-eslint>
- Stylelint. Update stylelint to version >=12 when issue will be fixed: <https://github.com/stylelint/vscode-stylelint/issues/4>
- CSS-Modules. Update style-loader to version >=1 when hot-replacement for css-modules will be fixed: <https://github.com/webpack-contrib/style-loader/issues/422>
