import React from 'react';

const withLogger = (WrappedComponent) => {
  return (props) => {
    console.log('Props', props);
    return <WrappedComponent {...props} />;
  };
};

// const withLogger = (config) => (WrappedComponent) => {
//   return (props) => {
//     console.log(config.message, props);
//     return <WrappedComponent {...props} />;
//   };
// };
// --------------------------------------------------------------

// function getDisplayName(WrappedComponent) {
//   return WrappedComponent.displayName || WrappedComponent.name || 'Component';
// }
// const withLogger = (config) => (WrappedComponent) => {
//   function withLogger(props) {
//     console.log(config.message, props);
//     return <WrappedComponent {...props} />;
//   };
//   withLogger.displayName = `withLogger(${getDisplayName(WrappedComponent)})`;
//   return withLogger;
// };
// --------------------------------------------------------------

// const withLogger = (config) => (WrappedComponent) => {
//   class WithLogger extends React.Component {
//     state = {
//       config,
//     };
//     render() {
//       console.log(config.message, this.props, this.state);
//       return <WrappedComponent {...this.props} config={this.state.config} />;
//     }
//   }
//   WithLogger.displayName = `withLogger(${getDisplayName(WrappedComponent)})`;
//   return WithLogger;
// };

export default withLogger;
