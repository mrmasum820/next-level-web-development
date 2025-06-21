import mongoose, { Schema, Document, Model } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema: Schema<IBorrow> = new Schema(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be a positive number"],
    },
    dueDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

// Pre-save Middleware for validating
borrowSchema.pre("save", async function (next) {
  const book = await mongoose.model("Book").findById(this.book);
  if (!book) {
    throw new Error("Book not found");
  }
  if (book.copies < this.quantity) {
    throw new Error("Insufficient copies available");
  }
  book.copies -= this.quantity;
  await book.updateAvailability();
  await book.save();
  next();
});

const Borrow: Model<IBorrow> = mongoose.model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
