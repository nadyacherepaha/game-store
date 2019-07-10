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
    return <h2>{this.state.title}</h2>;
  }
}

ReactDom.render(
  <AppContainer />,
  document.getElementById('app')
);