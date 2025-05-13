// Function with Generic

const createArray = <T>(param: T): T[] => {
  return [param];
};

const createArrayWithGeneric = <T>(param: T): T[] => {
  return [param];
};

const res = createArray("Bangladesh");
const resGeneric = createArrayWithGeneric<number>(222);

type User = { id: number; name: string };

const resGenericObj = createArrayWithGeneric<User>({
  id: 222,
  name: "MR Masum",
});

// Create Array with tuple

const createArrayWithTuple = <T, Q>(param1: T, param2: Q): [T, Q] => {
  return [param1, param2];
};

const result = createArrayWithTuple<string, number>("Bangladesh", 101);

const resultObj = createArrayWithTuple<string, { name: string; email: string }>(
  "Bangladesh",
  { name: "MR X", email: "x@gmail.com" }
);

// Generic with adding fixed value
const addCourseToStudent = <T>(student: T) => {
  const course = "HTML & CSS";
  return {
    ...student,
    course,
  };
};

const student1 = addCourseToStudent({
  name: "MR X",
  email: "x@gmail.com",
  devType: "NLWD",
});
const student2 = addCourseToStudent({
  name: "MR X",
  email: "x@gmail.com",
  hasWatch: "Apple Watch",
});
