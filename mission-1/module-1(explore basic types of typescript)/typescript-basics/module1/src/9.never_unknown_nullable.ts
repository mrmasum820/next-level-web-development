// Nullable Types
const searchName = (value: string | null) => {
  if (value) {
    console.log("Searching");
  } else {
    console.log("Nothing is found");
  }
};
// searchName(null);

// Unknown Types -> decision making on runtime
const getSpeedInMeterPerSecond = (speed: unknown) => {
  if (typeof speed === "number") {
    const meterPerSecond = (speed * 1000) / 3600;
    console.log(`The speed in meter per second is: ${meterPerSecond} km/s`);
  } else if (typeof speed === "string") {
    // const value = speed.split(" ")[0];
    const [value, unit] = speed.split(" ");
    const meterPerSecond = (parseFloat(value) * 1000) / 3600;
    console.log(`The speed in meter per second is: ${meterPerSecond} km/s`);
  } else {
    console.log("Invalid input");
  }
};

getSpeedInMeterPerSecond(100);
getSpeedInMeterPerSecond("100 km/h");
getSpeedInMeterPerSecond(undefined);
