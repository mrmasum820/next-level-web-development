// Interface types in object

type User1 = {
  name: string;
  age: number;
};

interface User2 {
  name: string;
  age: number;
}

type UserWithRole1 = User1 & { role: string };

interface UserWithRole2 extends User2 {
  role: string;
}

const User1: UserWithRole2 = {
  name: "John",
  age: 30,
  role: "developer",
};

// Interface types in array
type Roll1 = number[];
interface Roll2 {
  [index: number]: number;
}

const rollNumbers1: Roll1 = [1, 2, 3, 4];
const rollNumbers2: Roll2 = [1, 2, 3, 4, 5];

// Interface types in function
type Add1 = (num1: number, num2: number) => number;

interface Add2 {
  (num1: number, num2: number): number;
}

const add1: Add1 = (num1, num2) => num1 + num2;
const add2: Add2 = (num1, num2) => num1 + num2;

console.log(add1(10, 20));
console.log(add2(2, 3));
