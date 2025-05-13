// Conditonal types

type a1 = number;
type b1 = undefined;

type x = a1 extends number ? true : false;

type y = b1 extends null ? true : b1 extends string ? undefined : any;

// conditional using type of
type Sheikh = {
  car: string;
  house: string;
  money: number;
};

// type CheckCar<T> = T extends "car" | "house" | "money" ? true : false;
// type hasCar = CheckCar<"car">

type CheckVehicle<T> = T extends keyof Sheikh ? true : false;

type hasPlane = CheckVehicle<"plane">;
