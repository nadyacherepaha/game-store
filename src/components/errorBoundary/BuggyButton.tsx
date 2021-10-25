import React from "react";
import Button from "@mui/material/Button";

export interface BuggyButtonState {
  releaseBugs: unknown;
}

class BuggyButton extends React.Component<BuggyButtonState> {
  constructor(prop: BuggyButtonState) {
    super(prop);
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
