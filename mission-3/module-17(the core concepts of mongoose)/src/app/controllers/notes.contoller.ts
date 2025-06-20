import express, { Request, Response } from "express";
import app from "../app";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();

// get all notes
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(200).json({
    success: true,
    message: "Notes found successfully",
    notes: notes,
  });
});

// create a note
notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  // const myNote = new Note({
  //   title: "Learning Mongoose",
  //   content: "I am learning Mongoose",
  // });
  const note = await Note.create(body);

  // await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note: note,
  });
});

// get a single note
notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  // const note = await Note.findOne({_id: noteId});
  const note = await Note.findById(noteId);

  res.status(200).json({
    success: true,
    message: "Note found successfully",
    note,
  });
});

// update a single note
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  // 	const note = await Note.updateOne({_id: noteId}, updatedBody, {new: true});
  // 	const note = await Note.findOneAndUpdate({_id: noteId}, updatedBody, {new: true});
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

// delete a note
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // 	const note = await Note.deleteOne({_id: noteId}, {new: true});
  // 	const note = await Note.findOneAndDelete({_id: noteId}, {new: true});
  const note = await Note.findByIdAndDelete(noteId);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
    note,
  });
});
