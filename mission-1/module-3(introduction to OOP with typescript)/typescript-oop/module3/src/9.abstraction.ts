// abstraction -> hide the implementation details and show only the functionality

// 1. interface
// idea
interface Vehicle1 {
  startEngine(): void;
  stopEngine(): void;
  move(): void;
}

// implementation
class Car1 implements Vehicle1 {
  startEngine(): void {
    console.log("Starting the engine");
  }
  stopEngine(): void {
    console.log("Stopping the engine");
  }
  move(): void {
    console.log("Moving");
  }
}

const car1 = new Car1();
// car1.startEngine();

// 2. abstract class
abstract class Car2 {
  abstract startEngine(): void;
  abstract stopEngine(): void;
  abstract move(): void;
  test() {
    console.log("test");
  }
}

class Toyota extends Car2 {
  startEngine(): void {
    console.log("Starting the engine");
  }
  stopEngine(): void {
    console.log("Stopping the engine");
  }
  move(): void {
    console.log("Moving");
  }
}

const toyota = new Toyota();
toyota.startEngine();
toyota.stopEngine();
toyota.move();
