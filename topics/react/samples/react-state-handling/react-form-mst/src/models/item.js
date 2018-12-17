import { types, getParent } from 'mobx-state-tree';

const Item = types
  .model('Item', {
    quantity: types.number,
    price: types.number,
    name: types.string,
  })
  .views(self => ({
    get total() {
      return self.quantity * self.price;
    },
  }))
  .actions(self => ({
    increment() {
      self.quantity += 1;
    },
    decrement() {
      self.quantity -= 1;
    },
    remove() {
      getParent(self, 2).remove(self);
    },
  }));

export default Item;
