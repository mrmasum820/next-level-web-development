// Ternary Operator
const countedAge = 26;
const result = countedAge >= 18 ? "Adult" : "Child";
// console.log({ result });

// Nullish Coalescing Operator
const isAuthenticated = "";

const userName1 = isAuthenticated ?? "Guest";
const userName2 = isAuthenticated ? isAuthenticated : "Guest";
// console.log({ userName1 }, { userName2 });

// Optional Chaining Operator
type UniqueUser = {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    country: string;
    presentAddress: string;
    permanentAddress?: string;
  };
};

const user1: UniqueUser = {
  name: "Mahbubur Rahman",
  email: "y9o7e@example.com",
  address: {
    street: "Badda",
    city: "Dhaka",
    country: "Bangladesh",
    presentAddress: "Dhaka",
  },
};

const userResult = user1?.address?.permanentAddress ?? "Address not found";
// console.log({ userResult });
