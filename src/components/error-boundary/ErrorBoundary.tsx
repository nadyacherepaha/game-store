import React from "react";
import { Redirect } from "react-router-dom";

export interface ErrorBoundaryProps {
  props?: unknown;
}

export interface ErrorBoundaryState {
  error?: unknown;
  hasError?: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
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
      return (
        <div>
          <Redirect to="/error" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
