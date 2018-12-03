import React from 'react';

import Product from './Product';

// .flex - grid {
//   display: flex;
//   flex - wrap: wrap;
//   justify - content: space - between;
// }
// .col {
//   width: 32 %;
// }

const flexGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const col = {
  width: '32%',
};

const ProductList = ({ products }) => (
  <div style={flexGrid}>
    {products.map(product => (
      <div style={col} key={product.id}>
        <Product product={product} />
      </div>
    ))}
  </div>
);

export default ProductList;
