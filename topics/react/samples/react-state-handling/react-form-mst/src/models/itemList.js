import { types, destroy } from 'mobx-state-tree';

import Item from './item';

const ItemList = types
  .model('Items', {
    items: types.optional(types.array(Item), []),
  })
  .actions(self => ({
    add(item) {
      self.items.push(item);
    },
    remove(item) {
      // https://mobx.js.org/refguide/array.html
      // self.items.splice(self.items.indexOf(item), 1);
      // self.items = self.items.filter(x => x !== item);
      // self.items.remove(item);
      destroy(item);
    },
  }))
  .views(self => ({
    get total() {
      return self.items.reduce((acc, item) => acc + item.total, 0);
    },
  }));

export default ItemList;
