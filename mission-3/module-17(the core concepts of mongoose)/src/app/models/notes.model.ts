import { model, Schema } from "mongoose";
import { INotes } from "../interfaces/note.interface";

// schema define
export const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: " " },
    category: {
      type: String,
      enum: ["Personal", "Business", "Study", "Other"],
      default: "Personal",
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      label: { type: String, required: true },
      color: { type: String, default: "gray" },
    },
  },
  { versionKey: false, timestamps: true }
);

// define model
export const Note = model<INotes>("Note", noteSchema);
