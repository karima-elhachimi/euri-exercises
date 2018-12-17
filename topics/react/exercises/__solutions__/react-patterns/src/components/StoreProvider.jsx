import React from 'react';

export const StoreContext = React.createContext();

export class StoreProvider extends React.Component {
  state = {
    number: this.props.initialValue,
    increment: () => {
      console.log('inc');
      this.setState({
        number: this.state.number + 1,
      });
    },
  };
  render() {
    // prettier-ignore
    return (
      <StoreContext.Provider value={this.state}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}
