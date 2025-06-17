import express, { Application, Request, Response } from "express";
import { todosRouter } from "./todos/todos.routes";
const app: Application = express();

const userRouter = express.Router();

// middlewares
app.use(express.json());
app.use("/todos", todosRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to our Todo App");
});

export default app;
