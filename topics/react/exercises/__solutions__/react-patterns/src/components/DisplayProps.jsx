import React from 'react';

const DisplayProps = (props) => (
  <div style={{ margin: '1rem 0' }}>
    {/* eslint-disable jsx-a11y/heading-has-content */}
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        padding: '.5rem',
      }}
    >
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);

export default DisplayProps;
