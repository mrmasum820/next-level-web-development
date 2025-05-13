// Mapped types

const arrOfNumbers: number[] = [1, 4, 5, 7, 12];

const arrOfStrings: string[] = arrOfNumbers.map((number) => number.toString());

// console.log(arrOfStrings);

type AreaNumber = {
  height: number;
  width: number;
};

// type AreaString = {
//     height: string;
//     width: string;
// }

// keyof AreaNumber // "height" | "width"
// type Height = AreaNumber['height'];

type AreaString<T> = {
  [key in keyof T]: T[key];
};

const area: AreaString<{ height: string; width: number; deep: boolean }> = {
  height: "10",
  width: 20,
  deep: true,
};
