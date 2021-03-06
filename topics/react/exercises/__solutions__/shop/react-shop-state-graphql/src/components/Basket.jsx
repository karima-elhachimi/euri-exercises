import React from 'react';
import { toCurrency } from '../core/intl';

const BasketList = ({ basket }) => (
  <div>
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {basket &&
            basket.items &&
            basket.items.map(item => (
              <tr key={item.product.id}>
                <td>{item.product.title}</td>
                <td>{toCurrency(item.product.price)}</td>
                <td>{item.quantity}</td>
                <td>{toCurrency(item.total)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <h4>Total: {toCurrency(basket.total)}</h4>
    </div>
  </div>
);

export default BasketList;
