// Generic types

type GenericArray<T> = Array<T>;

// const rollNumbers: number[] = [1, 2, 3, 4, 5];
// const rollNumbers: Array<number> = [1, 2, 3, 4, 5];
const rollNumbers: GenericArray<number> = [1, 2, 3, 4, 5];

// const mentors: string[] = ["Aditya", "Rohit", "Rahul"];
// const mentors: Array<string> = ["Aditya", "Rohit", "Rahul"];
const mentors: GenericArray<string> = ["Aditya", "Rohit", "Rahul"];

const boolArray: GenericArray<boolean> = [true, false, true];

const user: GenericArray<{ name: string; age: number; role: string }> = [
  {
    name: "John",
    age: 30,
    role: "admin",
  },
  {
    name: "Doe",
    age: 20,
    role: "manager",
  },
];

//generic types with tuple

type GenericTuple<X, Y> = [X, Y];

const person: GenericTuple<string, string> = ["John", "Marry"];

const user2: GenericTuple<number, { name: string; email: string }> = [
  123,
  {
    name: "John",
    email: "john@example.com",
  },
];
