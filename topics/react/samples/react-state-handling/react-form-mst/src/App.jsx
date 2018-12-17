import React from 'react';

import MstForm from './components/MstForm';

const App = props => (
  <div className="App">
    <h1>MobxStateTree Sample</h1>
    <MstForm {...props} />
  </div>
);

export default App;
