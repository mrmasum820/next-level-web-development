const addCourseToStudentExtened = <
  T extends { id: number; name: string; email: string }
>(
  student: T
) => {
  const course = "Next Level Web Development";
  return {
    ...student,
    course,
  };
};

const newStudent = addCourseToStudentExtened({
  id: 103,
  name: "MR Z",
  email: "z@gmail.com",
  filled: "nothing",
});

const stud1 = addCourseToStudentExtened({
  id: 101,
  name: "MR X",
  email: "x@gmail.com",
  devType: "NLWD",
});

const stud2 = addCourseToStudentExtened({
  id: 102,
  name: "MR X",
  email: "x@gmail.com",
  hasWatch: "Apple Watch",
});
