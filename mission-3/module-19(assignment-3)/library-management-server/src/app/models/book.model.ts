import mongoose, { Schema, Document, Model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Instance Method for updating
bookSchema.methods.updateAvailability = async function (): Promise<void> {
  this.available = this.copies > 0;
  await this.save();
};

// Pre-save Middleware
bookSchema.pre("save", function (next) {
  this.available = this.copies > 0;
  next();
});

const Book: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);
export default Book;
