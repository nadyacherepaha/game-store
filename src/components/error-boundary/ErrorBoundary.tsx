import React from "react";
import { Redirect } from "react-router-dom";

export const reloadPage = () => window.location.reload();

export interface ErrorBoundaryState {
  error?: unknown;
  hasError: false;
}

class ErrorBoundary extends React.Component<ErrorBoundaryState> {
  constructor(props: ErrorBoundaryState) {
    super(props);
    this.state = {
      error: null,
      hasError: null,
    };
  }

  componentDidCatch(error: unknown, hasError: true) {
    this.setState({
      error,
      hasError,
    });
  }

  render() {
    if (this.state.error) {
      return <Redirect to="/error" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
