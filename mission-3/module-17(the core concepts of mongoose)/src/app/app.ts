import express, { Application, Request, Response } from "express";
import { Note } from "./models/notes.model";
import { notesRoutes } from "./controllers/notes.contoller";

const app: Application = express();

// middlewares
app.use(express.json());

// use routers
app.use("/notes", notesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Note App");
});

export default app;
