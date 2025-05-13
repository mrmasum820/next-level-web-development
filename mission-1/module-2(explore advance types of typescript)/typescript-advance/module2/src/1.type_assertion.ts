// when we know the type of the variable then we can use type assertion

let anything: any;

anything = "Hello world";
anything = 222;

// (anything as string).  // we can access all string methods

(anything as number).toExponential(2);

// Function
const KgToGm = (value: string | number): string | number | undefined => {
  if (typeof value === "string") {
    const convertedValue = parseFloat(value) * 1000;
    return `The converted Value is ${convertedValue}`;
  } else if (typeof value === "number") {
    return value * 1000;
  } else {
    return "Please enter a valid value";
  }
};

const result1 = KgToGm(20);
const result2 = KgToGm("20") as string;
// console.log(result2);

// Error Type define
type CustomError = {
  message: string;
};
try {
} catch (error) {
  console.log((error as CustomError).message);
}
