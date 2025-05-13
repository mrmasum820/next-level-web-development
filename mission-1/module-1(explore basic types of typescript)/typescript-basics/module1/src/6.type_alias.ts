// Type Alias

type Student = {
  name: string;
  age: number;
  isSingle: boolean;
  friends: string[];
  phone: string;
  homeTown?: string;
};

const student1: Student = {
  name: "Masum",
  age: 30,
  isSingle: false,
  friends: ["Shawan", "Atik", "Pranto"],
  phone: "01712345678",
  homeTown: "Dhaka",
};

const student2: Student = {
  name: "Shawan",
  age: 29,
  isSingle: false,
  friends: ["Shawan", "Atik", "Pranto"],
  phone: "01712345678",
};

const student3: Student = {
  name: "Atik",
  age: 32,
  isSingle: false,
  friends: ["Fisal", "Manik", "Pranto"],
  phone: "01712345678",
};

type UserName = string;
type IsAdmin = boolean;

const userName: UserName = "mrmasum";
const isAdmin: IsAdmin = true;

type Sub = (a: number, b: number) => number;

const sub: Sub = (a, b) => a - b;
