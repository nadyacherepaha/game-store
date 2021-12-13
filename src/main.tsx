import "./styles/main.module.scss";
import React, { FC, StrictMode, Suspense } from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import styleSpinner from "./components/games/card-game/cardGame.module.scss";
import routes from "./constants/routes";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import setupStore from "./redux/store/store";

interface AppState {}

const AppContainer: FC<AppState> = () => {
  const store = setupStore();

  return (
    <StrictMode>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route>
              <Redirect to="/home" />
              <Suspense fallback={<CircularProgress className={styleSpinner.spinner} color="secondary" />}>
                {routes.map(({ path, component, exact }) => (
                  <Route key={path} exact={exact} path={path} component={component} />
                ))}
              </Suspense>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </StrictMode>
  );
};

ReactDom.render(<AppContainer />, document.getElementById("app"));
