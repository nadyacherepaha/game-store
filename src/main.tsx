import "./styles/main.module.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "./constants/routes";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import store from "./redux/store/store";

interface AppState {}

class AppContainer extends Component<AppState> {
  render() {
    return (
      <StrictMode>
        <Provider store={store}>
          <Router>
            <Header />
            <Switch>
              <Route>
                <Redirect to="/home" />
                {routes.map(({ path, component, exact }) => (
                  <Route key={path} exact={exact} path={path} component={component} />
                ))}
              </Route>
            </Switch>
            <Footer />
          </Router>
        </Provider>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
