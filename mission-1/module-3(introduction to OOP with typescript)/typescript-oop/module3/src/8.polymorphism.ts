// polymorphism
class Parent {
  getSleep() {
    console.log(`I am sleeping for 8 hours`);
  }
}

class Students extends Parent {
  getSleep() {
    console.log(`I am sleeping for 7 hours`);
  }
}

class Developers extends Parent {
  getSleep() {
    console.log(`I am sleeping for 6 hours`);
  }
}

const getSleep = (params: Parent) => {
  return params.getSleep();
};

const person1 = new Parent();
const person2 = new Students();
const person3 = new Developers();

getSleep(person1);
getSleep(person2);
getSleep(person3);

// another example using shape
class Shape {
  getArea(): number {
    return 0;
  }
}

class Circle extends Shape {
  radius: number;
  constructor(radius: number) {
    super();
    this.radius = radius;
  }
  // area = pi * radius * radius;
  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    super();
    this.width = width;
    this.height = height;
  }
  // area = width * height
  getArea(): number {
    return this.width * this.height;
  }
}

const getShapeArea = (params: Shape) => {
  console.log(params.getArea());
};

const shape = new Shape();
const circle = new Circle(10);
const rectangle = new Rectangle(10, 20);

getShapeArea(shape);
getShapeArea(circle);
getShapeArea(rectangle);
