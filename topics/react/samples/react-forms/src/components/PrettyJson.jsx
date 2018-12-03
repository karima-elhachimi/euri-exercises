import React from 'react';

const PrettyJson = props => {
  const { label, data } = props;
  return (
    <div style={{ margin: '1rem 0' }}>
      {/* <h3 style={{ fontFamily: 'monospace' }} /> */}
      <pre
        style={{
          background: '#f6f8fa',
          fontSize: '.65rem',
          padding: '.5rem',
        }}
      >
        <strong>{label || 'json'}</strong> = {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default PrettyJson;
