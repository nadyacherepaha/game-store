import React from "react";
import Button from "@mui/material/Button";

export interface AppProps {}

export interface AppState {
  releaseBugs: unknown;
}

class BuggyButton extends React.Component<AppProps, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      releaseBugs: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      releaseBugs: true,
    });
  }

  render() {
    if (this.state.releaseBugs) {
      throw new Error("I crashed!");
    }
    return (
      <Button variant="outlined" onClick={this.handleClick} color="error">
        Scary Button!
      </Button>
    );
  }
}

export default BuggyButton;
