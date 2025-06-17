import express, { Request, Response } from "express";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";
export const todosRouter = express.Router();

// get all todos
todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

// create todo
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const cursor = collection.find({});
  const todos = await cursor.toArray();
  res.json(todos);
});

// get a single todo
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  const todo = await collection.findOne({ _id: new ObjectId(id) });
  res.json(todo);
});

// update a todo
todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, priority, isCompleted } = req.body;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const filter = { _id: new ObjectId(id) };
  const updateTodo = await collection.updateOne(
    filter,
    {
      $set: {
        title: title,
        description: description,
        priority: priority,
        isCompleted: isCompleted,
      },
    },
    { upsert: true }
  );

  res.json(updateTodo);
});

// delete a todo
todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  await collection.deleteOne({ _id: new ObjectId(id) });

  res.json({ message: "Todo deleted successfully" });
});
