import React from 'react';
import ReactDOM from 'react-dom';
import { onPatch } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import './style.css';
import 'react-select/dist/react-select.css';
import App from './App';
import Invoice from './models/invoice';

const invoice = Invoice.create({ currency: 'BE' });
onPatch(invoice, patch => {
  console.log(patch);
});
makeInspectable(invoice);

ReactDOM.render(<App invoice={invoice} />, document.getElementById('root'));
