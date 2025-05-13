// Constraint using of key of

type Vehicle = {
  bike: string;
  car: string;
  ship: string;
};

type Owner = "bike" | "car" | "ship"; // manually

type Owner2 = keyof Vehicle;

const person1: Owner2 = "ship";

// using Function based on property
const getPropertyValue = <X, Y extends keyof X>(obj: X, key: Y) => {
  return obj[key];
};

const newuser = {
  name: "MR X",
  age: 29,
  address: "Dhaka, Bangladesh",
};

const userResult = getPropertyValue(newuser, "address");
