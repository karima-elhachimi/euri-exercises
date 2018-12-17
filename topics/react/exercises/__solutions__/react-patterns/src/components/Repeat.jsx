import React from 'react';

const Repeat = (props) => {
  const { numTimes, render } = props;
  let items = [];
  for (let i = 0; i < numTimes; i++) {
    items.push(render(i));
  }

  return <div>{items}</div>;
};

export default Repeat;
