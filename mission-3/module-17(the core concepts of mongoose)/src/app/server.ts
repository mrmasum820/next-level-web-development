import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://noteapp:noteapp@cluster0.qcj0e7o.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected to MongoDB using Mongoose");

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
