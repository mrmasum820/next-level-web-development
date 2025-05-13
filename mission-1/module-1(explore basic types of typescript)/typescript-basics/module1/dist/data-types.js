"use strict";
// primitive data types
// string
let firstName = "Mahbubur Rahman";
// number
let age = 30;
// age = 'masum'
// boolean
let isSingle = true;
// isSingle = 20
// undefined
let height = undefined;
// null
let color = null;
let d;
d = "Masum";
// d = null
// d = true
// non primitive data types
// Array
let friends = ["Shawan", "Atik", "Pranto"];
let ages = [29, 32, 28];
// Tuple
let person = ["Masum", 30];
let student = ["Shawan", 29, true];
student[2] = false;
console.log(student);
// Object
let user = {
  firstName: "MH",
  lastName: "Shawan",
  age: 30,
  isMarried: false,
  company: "B9Zero",
};
// user.company = 'Google'
// Function
// 1. Normal Function,
function add(num1, num2) {
  return num1 + num2;
}
// add(5, 'hello')
// 2. Arrow Function
let multiply = (a, b) => a * b;
// object -> function -> method
let poorUser = {
  fullName: "MR Masum",
  balance: 0,
  addBalance(amount) {
    return `My account balance is: ${this.balance + amount}`;
  },
};
console.log(poorUser.addBalance(100));
