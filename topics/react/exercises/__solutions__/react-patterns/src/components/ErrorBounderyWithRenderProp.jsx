import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    console.log('ERROR:', error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.errorRendering) {
        return this.props.errorRendering(this.state.error);
      }
      return <h1>Oops we have an error, sorry about that.</h1>;
    }

    return this.props.children;
  }
}

/**
 * <ErrorBoundary
 *   errorRendering={(error) => (
 *     <div>
 *        <h1>Error Notification</h1>
 *        <Alert msg={error.message} />
 *     </div>
 *   }>
 *   <HomePage />
 * </ErrorBoundery>
 */

export default ErrorBoundary;
