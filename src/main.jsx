import './styles/main.css';
import style from "./styles/main.module.css";
import './styles/main.scss';
import React, { Component } from "react";
import ReactDom from "react-dom";
import imgSmall from 'images/testSmall.png'; //start-path is 'images' because we have an alias 'images in webpack.common.js
import imgCamera from 'images/camera.svg';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title1: "Test-block for css-modules"
    };
  }
  render() {
    return (
      <>
        <div className="test-block">
          <h2 className={style.mainTitle}>{this.state.title1}</h2>
        </div>
        <div className={["test-block", style.background].join(' ')}>
          <h2>Test-block for url-loader</h2>
          <img src={imgSmall} alt="smallImage"></img>
        </div>
        {/*  or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>
        */}
        <div className={["test-block", style.svgBackground].join(' ')}>
          <h2>Test-block for svg-url-loader</h2>
          <img src={imgCamera} alt="small_SVG_Image"></img>
        </div>
      </>
    )
  }
}

ReactDom.render(
  <AppContainer />,
  document.getElementById('app')
);