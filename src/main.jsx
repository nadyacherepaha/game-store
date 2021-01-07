import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import imgSmall from "images/testSmall.png"; // start-path is 'images' because we have an alias 'images' in webpack.common.js
import imgCamera from "images/camera.svg";
import { Component } from "react";
import ReactDom from "react-dom";
import style from "./styles/main.module.css";
import tsTest from "./tsTest";
import jsTest from "./jsTest";
import someTypeScript from "./someTypeScript";
import testConst from "./constTest";

import { valueEs6 } from "./treeShakeES6Test";
// eslint-disable-next-line prefer-destructuring
const valueNodeJs = require("./treeShakeNodeTest").valueNodeJs;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title1: someTypeScript("Test-block for css-modules"),
    };
    tsTest();
    jsTest();
    console.warn(valueNodeJs, valueEs6);
    testConst();

    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <>
        <div className="test-block">
          <h2 className={style.mainTitle}>{this.state.title1}</h2>
        </div>
        <div className={["test-block", style.background].join(" ")}>
          <h2>Test-block for url-loader</h2>
          <img src={imgSmall} alt="smallImage" />
        </div>
        {/*  or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>
        */}
        <div className={["test-block", style.svgBackground].join(" ")}>
          <h2>Test-block for svg-url-loader</h2>
          <img src={imgCamera} alt="small_SVG_Image" />
        </div>
      </>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
