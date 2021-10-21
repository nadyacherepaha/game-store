import React from "react";

export interface AppProps {
  // code related to your props goes here
}

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
      return <ErrorPage />;
    }
    return (
      <button type="button" className="btn" onClick={this.handleClick}>
        Scary Button!
      </button>
    );
  }
}

export default BuggyButton;
