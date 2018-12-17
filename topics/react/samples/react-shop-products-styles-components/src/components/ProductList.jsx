import React from 'react';
import styled from 'styled-components';
import Product from './Product';

// .flex - grid {
//   display: flex;
//   flex - wrap: wrap;
//   justify - content: space - between;
// }
// .col {
//   width: 32 %;
// }

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GridCell = styled.div`
  width: 32 %;
`;

const ProductList = ({ products }) => (
  <Grid>
    {products.map(product => (
      <GridCell key={product.id}>
        <Product product={product} />
      </GridCell>
    ))}
  </Grid>
);

export default ProductList;
