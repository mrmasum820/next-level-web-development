import mongoose from "mongoose";
import { app } from "./app";

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to MongoDB using Mongoose");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

main();
