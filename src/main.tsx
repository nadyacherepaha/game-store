import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import style from "./styles/main.module.css";

interface AppState {
  title: string;
}

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

ReactDom.render(<AppContainer title={`''`} />, document.getElementById("app"));
