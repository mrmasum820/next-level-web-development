// typeof / in
type Alphaneumeric = number | string;
const add = (num1: Alphaneumeric, num2: Alphaneumeric): Alphaneumeric => {
  if (typeof num1 === "number" && typeof num2 === "number") {
    return num1 + num2;
  } else {
    return num1.toString() + num2.toString();
  }
};

// console.log(add(2, 3));
// console.log(add(2, "3"));

// guard in type

type NormalUser = {
  name: string;
};

type AdminUser = {
  name: string;
  role: "admin";
};

const getUser = (user: NormalUser | AdminUser) => {
  if ("role" in user) {
    console.log(`Admin User: ${user.name} and role is ${user.role}`);
  } else {
    console.log(`Normal User: ${user.name}`);
  }
};

const normalUser: NormalUser = {
  name: "John",
};

const adminUser: AdminUser = {
  name: "Jane",
  role: "admin",
};

getUser(adminUser);
