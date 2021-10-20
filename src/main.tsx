import "./styles/main.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import AboutPage from "./pages/aboutPage/AboutPage";

interface AppState {}

class AppContainer extends Component<AppState> {
  render() {
    return (
      <StrictMode>
        <Router>
          <Switch>
            <Route path="/home" exact>
              <HomePage />
            </Route>
            <Route path="/products" exact>
              <ProductsPage />
            </Route>
            <Route path="/about" exact>
              <AboutPage />
            </Route>
            <Redirect to="/home" />
          </Switch>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
