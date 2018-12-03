const action = actor => {
  console.log(`Hello from: ${actor}`);
};
action('the World');

class MyClass {
  name = 'aaa';
  constructor() {
    console.log(name);
  }
}

console.log(new MyClass());
