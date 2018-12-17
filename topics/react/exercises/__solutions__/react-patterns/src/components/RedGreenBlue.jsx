import React, { Fragment } from 'react';

import { StoreContext } from './StoreProvider';

export const Green = () => (
  <div className="green">
    <StoreContext.Consumer>
      {(context) => (
        <Fragment>
          <p>{context.number}</p>
          <button className="btn btn-default" onClick={context.increment}>
            Inc
          </button>
          <Blue />
        </Fragment>
      )}
    </StoreContext.Consumer>
  </div>
);

export const Red = () => (
  <div className="red">
    <StoreContext.Consumer>{(context) => context.number}</StoreContext.Consumer>
  </div>
);

export class Blue extends React.Component {
  static contextType = StoreContext;
  render() {
    return (
      <div className="blue">
        <p>{this.context.number}</p>
      </div>
    );
  }
}
