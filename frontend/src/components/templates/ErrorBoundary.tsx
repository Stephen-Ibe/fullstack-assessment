import React, { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log error to an error reporting service if needed
    console.error("ErrorBoundary caught an error", error, info);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="not_found">
          <h1 className="text-8xl">Oops!</h1>
          <p className="tracking-widest text-lg">- Something went wrong -</p>
          <button
            className="py-2 border px-10 my-4"
            onClick={this.handleRefresh}
          >
            Click to <strong>REFRESH</strong>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
