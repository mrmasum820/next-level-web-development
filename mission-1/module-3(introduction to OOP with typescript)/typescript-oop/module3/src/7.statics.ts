// statics in OOP
// statics are properties and methods that are shared by all instances of a class(reffered one memory)

class Counter {
  static count: number = 0;
  static increment() {
    return (Counter.count = Counter.count + 1);
  }
  static decrement() {
    return (Counter.count = Counter.count - 1);
  }
}

const instance1 = new Counter();
// console.log(instance1.increment()); // 1 used a memory
console.log(Counter.increment());

const instance2 = new Counter();
// console.log(instance2.increment()); // 1 used different memory
console.log(Counter.increment());

const instance3 = new Counter();
// console.log(instance3.increment());
console.log(Counter.increment());
