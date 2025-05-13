// Spread Operator
const bros1: string[] = ["Shawan", "Atik", "Pranto"];
const bros2: string[] = ["Faisal", "Manik", "Mamun"];

// bros1.push(...bros2);
const allBros = [...bros1, ...bros2];

const mentors1 = {
  typescript: "Shawan",
  javascript: "Atik",
  react: "Pranto",
};

const mentors2 = {
  html: "Faisal",
  css: "Manik",
  bootstrap: "Mamun",
};

const mentors = { ...mentors1, ...mentors2 };

// Rest Operators
const greetFriends = (...friends: string[]) => {
  // console.log(`Hi ${friend1}, ${friend2} and ${friend3}`);
  friends.forEach((friend: string) => console.log(`Hi ${friend}`));
};
// greetFriends("Shawan", "Atik", "Pranto", "faisal", "manik");
