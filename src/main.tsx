import "./styles/main.module.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "./constants/routes";

interface AppState {}

class AppContainer extends Component<AppState> {
  render() {
    return (
      <StrictMode>
        <Router>
          <Switch>
            <Route>
              <Redirect to="/home" />
              {routes.map(({ path, component, exact }) => (
                <Route exact={exact} path={path} component={component} />
              ))}
            </Route>
          </Switch>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
