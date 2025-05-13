// Union Type
type User = {
  name: string;
  age?: number;
  gender: "male" | "female";
  bloodGroup: "A+" | "B+" | "O+" | "AB+" | "A-" | "B-" | "O-" | "AB-";
  address: string;
};

const newUser: User = {
  name: "Abdul Rahim",
  gender: "male",
  bloodGroup: "A+",
  address: "Dhaka",
};

// Intersection Type
type FrontendDeveloper = {
  skills: string[];
  designation: string;
  salary?: number;
};

type BackendDeveloper = {
  skills: string[];
  designation: string;
  salary?: number;
};

type FullstackDeveloper = FrontendDeveloper & BackendDeveloper;

const fullstackDeveloper: FullstackDeveloper = {
  skills: ["JS", "TS", "React", "Node", "MongoDB"],
  designation: "Fullstack Developer",
  salary: 80000,
};
