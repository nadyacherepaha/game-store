import React from "react";

export interface AppProps {
  props?: unknown;
}

export interface AppState {
  error?: unknown;
  errorInfo?: unknown;
}

class ErrorBoundary extends React.Component<AppProps, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div>
          <h2>Oh-no! Something went wrong</h2>
          <p className="red">{this.state.error && this.state.error.toString()}</p>
          <div>{"Component Stack Error Details: "}</div>
          <p className="red">{this.state.errorInfo.componentStack}</p>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

export default ErrorBoundary;
