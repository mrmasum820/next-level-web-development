// Function
// 1. Normal Function,
function add(num1: number, num2: number): number {
  return num1 + num2;
}

// add(5, 'hello')

// 2. Arrow Function
let multiply = (a: number, b: number): number => a * b;

// object -> function -> method

let poorUser = {
  fullName: "MR Masum",
  balance: 0,
  addBalance(amount: number): string {
    return `My account balance is: ${this.balance + amount}`;
  },
};

// console.log(poorUser.addBalance(100));

const numbers: number[] = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

const doubleNumbers: number[] = numbers.map(
  (item: number): number => item * item
);
