import "./styles/main.scss";
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import AboutPage from "./pages/aboutPage/AboutPage";

interface AppState {}

class AppContainer extends Component<AppState> {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <StrictMode>
        <Router>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/products" exact>
              <ProductsPage />
            </Route>
            <Route path="/about" exact>
              <AboutPage />
            </Route>
          </Switch>
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
