// Utility types -> pick, omit, Required, Partial, Required, Readonly, Record

// pick
type Person = {
  name: string;
  age: number;
  email?: string;
  phone: number;
};

type nameAge = Pick<Person, "name" | "age">;

// omit
type phone = Omit<Person, "name" | "age">;

// Required
type RequiredPerson = Required<Person>;

// partial
type PartialPerson = Partial<Person>;

// Readonly
type ReadonlyPerson = Readonly<Person>;

const personReadOnly: ReadonlyPerson = {
  name: "John",
  age: 30,
  phone: 123,
};
// personReadOnly.name = "Marry"

// Record
// type myObj = {
//     a: string;
//     b: string
// }

type MyObj = Record<string, number>;

const emptyObj: Record<string, unknown> = {};

// const obj: MyObj = {
//     a: "a",
//     b: "b",
//     c: "c",
//     d: 20
// }
