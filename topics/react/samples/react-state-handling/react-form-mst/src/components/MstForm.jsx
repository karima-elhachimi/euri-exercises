import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Item from './Item';

// eslint-disable-next-line
class MstForm extends Component {
  render() {
    const { invoice } = this.props;
    return (
      <div>
        <h2>{invoice.status()}</h2>
        {!invoice.is_paid && <button onClick={invoice.markPaid}>Pay</button>}

        <form
          onSubmit={e => {
            e.preventDefault();
            invoice.itemList.add({
              name: this.nameInput.value,
              quantity: parseInt(this.quantityInput.value, 10),
              price: parseFloat(this.priceInput.value),
            });
            e.target.reset();
            this.nameInput.focus();
          }}
        >
          <label htmlFor="name">
            <input
              type="text"
              ref={input => (this.nameInput = input)}
              id="name"
              placeholder="enter name"
            />
          </label>
          <label htmlFor="quantity">
            <input
              type="number"
              ref={input => (this.quantityInput = input)}
              id="quantity"
              placeholder="enter quantity"
            />
          </label>
          <label htmlFor="price">
            <input
              type="text"
              ref={input => (this.priceInput = input)}
              id="price"
              placeholder="enter price"
            />
          </label>
          <button type="submit">Add</button>
        </form>
        <h2>{invoice.itemList.total}</h2>
        <ul>
          {invoice.itemList.items.map((item, index) => (
            <Item item={item} key={index} />
          ))}
        </ul>
      </div>
    );
  }
}

export default observer(MstForm);
