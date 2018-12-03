import { types } from 'mobx-state-tree';
import ItemList from './itemList';

const Invoice = types
  .model('Invoice', {
    currency: types.string,
    is_paid: false,
    itemList: types.optional(ItemList, { items: [] }),
  })
  .views(self => ({
    status() {
      return self.is_paid ? 'paid' : 'not paid';
    },
  }))
  .actions(self => ({
    markPaid() {
      self.is_paid = true;
    },
  }));

export default Invoice;
