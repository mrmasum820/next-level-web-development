// Destructuring Object
const person1 = {
  firstName: "Mahbubur Rahman",
  surName: "Masum",
  age: 30,
  address: {
    street: "Badda",
    city: "Dhaka",
    country: "Bangladesh",
  },
  contactNumber: {
    mobile: 123456789,
    home: 987654321,
  },
};

const {
  surName: nickName,
  address: { city },
  contactNumber: { mobile: mobileNumber },
} = person1; // name alias

// Destructuring Array
const friends1: string[] = ["Shawan", "Atik", "Pranto", "Faisal", "Manik"];

const [, , bestFriend, ...cousins] = friends1; // Pranto is bestFriend and Faisal, Manik are cousins
