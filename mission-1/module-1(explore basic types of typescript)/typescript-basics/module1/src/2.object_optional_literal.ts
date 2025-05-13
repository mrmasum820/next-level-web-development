// Object
let user: {
  firstName: string;
  middleName?: string; // optional type
  lastName: string;
  age: number;
  readonly company: "B9Zero"; // literal type
  isMarried: boolean;
} = {
  firstName: "MH",
  lastName: "Shawan",
  age: 30,
  isMarried: false,
  company: "B9Zero",
};

// user.company = 'Google'
