import "./styles/main.module.scss";
import React, { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import routes from "./constants/routes";
import AuthContext from "./contexts/AuthContext";
import * as AuthService from "./services/auth.service";

interface AppState {
  isAuth: boolean;
}

class AppContainer extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      isAuth: false,
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      this.signIn(AuthService.userStr);
    }
    return this.state.isAuth;
  }

  signIn = (userName: string) => {
    AuthService.login(userName);
    this.setState({
      isAuth: true,
    });
  };

  signOut = () => {
    AuthService.logout();
    this.setState({
      isAuth: false,
    });
  };

  render() {
    const user = this.state.isAuth;

    return (
      <StrictMode>
        <AuthContext.Provider value={{ user, signIn: this.signIn, signOut: this.signOut }}>
          <Router>
            <Switch>
              <Route>
                <Redirect to="/home" />
                {routes.map(({ path, component, exact }) => (
                  <Route key={path} exact={exact} path={path} component={component} />
                ))}
              </Route>
            </Switch>
          </Router>
        </AuthContext.Provider>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
