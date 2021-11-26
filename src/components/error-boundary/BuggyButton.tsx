import React from "react";
import Button from "@mui/material/Button";

export interface BuggyButtonState {
  releaseBugs: boolean;
}

class BuggyButton extends React.Component<BuggyButtonState> {
  constructor(props: BuggyButtonState) {
    super(props);
    this.state = {
      releaseBugs: false,
    };
  }

  handleClick = () => {
    this.setState({
      releaseBugs: true,
    });
  };

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
