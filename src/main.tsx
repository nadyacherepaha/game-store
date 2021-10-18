import "./styles/main.css";
import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import style from "./styles/main.module.css";

interface AppState {}

class AppContainer extends Component<AppState> {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <StrictMode>
        <div className="test-block">
          <h2 className={style.mainTitle}>Hi</h2>
        </div>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
