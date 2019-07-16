import './styles/main.css';
import style from "./styles/main.module.css";
import style2 from "./testFolder/test.module.css";
import './styles/main.scss';
import React, { Component } from "react";
import ReactDom from "react-dom";
import imgSmall from './images/testSmall.png';

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: "Hello"
    };
  }
  render() {
    return (
      <div className={style.background}>
        <h2 className={[style.mainTitle, style2.mainTitle2].join(' ')}>{this.state.title}</h2>
        <img src={imgSmall} alt="smallImage"></img>
        {/*  or it can be
          <img src='/src/images/testSmall.png' alt="smallImage"></img>
        */}
      </div>
    )
  }
}

ReactDom.render(
  <AppContainer />,
  document.getElementById('app')
);