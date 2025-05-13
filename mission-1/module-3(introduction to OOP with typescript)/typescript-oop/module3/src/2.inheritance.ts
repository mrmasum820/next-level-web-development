// get properties and methods from parent is called inheritance
// constructor is also inherited from parent class by default
// super keyword is used to call parent class constructor

class Person {
  name: string;
  age: number;
  address: string;
  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  getSleep(numOfHours: number) {
    console.log(`${this.name} is sleeping for ${numOfHours} hours`);
  }
}

class Student extends Person {
  constructor(name: string, age: number, address: string) {
    super(name, age, address);
  }
}

class Teacher extends Person {
  designation: string;
  constructor(name: string, age: number, address: string, designation: string) {
    super(name, age, address);
    this.designation = designation;
  }
  takeClass(numOfClasses: number) {
    console.log(`${this.name} is taking ${numOfClasses} classes`);
  }
}

const student1 = new Student("MR X", 20, "New York");
// student1.getSleep(8);

const teacher1 = new Teacher("MR Y", 30, "Los Angeles", "Professor");
teacher1.takeClass(5);
