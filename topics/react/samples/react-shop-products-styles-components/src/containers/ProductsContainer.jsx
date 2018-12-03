import React, { Component } from 'react';

import api from '../api';
import ProductList from '../components/ProductList';

export default class ProductContainer extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    api.get('/products').then(res => {
      this.setState({
        products: res.data.selectedProducts,
      });
    });
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h2>Products</h2>
        <ProductList products={products} />
      </div>
    );
  }
}
