import './main.css';
import style from "./main.module.css";
import React, { Component } from "react";
import ReactDom from "react-dom";

class AppContainer extends Component {
  constructor() {
    super();
    this.state = {
      title: "Hello"
    };
  }
  render() {
    return <h2 className={style.mainTitle}>{this.state.title}</h2>;
  }
}

ReactDom.render(
  <AppContainer />,
  document.getElementById('app')
);