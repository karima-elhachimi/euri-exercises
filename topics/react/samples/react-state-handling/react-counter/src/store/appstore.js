import { observable, action } from 'mobx';

//
// MobX store class
//
export default class AppStore {
  // state
  @observable counter = 10;

  // actions
  @action.bound
  increment() {
    this.counter += 1;
  }

  @action.bound
  decrement() {
    this.counter -= 1;
  }
}
