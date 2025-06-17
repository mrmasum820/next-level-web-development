## 1. Introduction to express

Fast, unopinionated, minimalist web framework for Node.js.

Express.js is all written with Node.js.

### Why we use Express.js

- Complex Routing
- Easier handle of Request and Response
- Middleware to handle complex logic
- Easier handling of Errors

## 2. Creating web server with express

```tsx
npm init -y
.gitignore -> node_modules

npm i -D typescript
npm i express
tsc --init // tsconfig.json(rootDir: "./src/" + outDire: "./dist/")

// src -> app -> app.ts + server.ts
// app.ts
import express from "express"  // npm i --save-dev @types/express
const app: Application = express();

app.get("/", (req: Request, res: Response)=> {
	res.send("Welcome to TOdo App");
})

export default app;

//server.ts
import app from "./app";

let server;
const port = 5000;

const bootstrap = async () => {
	server = app.listen(port, ()=> {
		console.log(`Server is running on port ${port}`)
	})
}

bootstrap();
// tsc -w
// scripts -> "dev": "nodemon ./dist/server.js",
//npm run dev
```

## 3. What is Parsers, Request and Response?

```tsx
import fs from "fs";
import path from "path";

const filePath = path.join(__direname, "../db/todo.json");

app.use(express.json()); // middleware + person for converting json data

app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log(data);
  res.send("get all todos");
});

app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Data posted successfully");
});
```

## 4. What is Params & Queries?

```tsx
// http://localhost:5000/todos/express?title=prisma&body=learning-prisma
app.get("/todos/:title", (req: Request, res: Response) => {
  console.log("From params", req.params);
  console.log("From query", req.query);
  res.send("get all todos");
});
```

## 5. Routing in express

```tsx
const todosRouter = express.Router();

app.use("/", todosRouter);

todosRouter.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From todos router");

  res.json({
    message: "From todos Router",
    data,
  });
});
```

## 6. Organizing codes & splitting the routes

```tsx
// app.ts
import { todosRouter } from "./app/todos/todos.routes";

app.use("/", todosRouter);

app.get("/", (req, res) => {
  res.send("Welcome to todos app");
});

// app -> todos -> todos.routes.ts
export const todosRouter = express.Router();

todosRouter.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  console.log("From todos router");

  res.json({
    message: "From todos Router",
    data,
  });
});

todosRouter.post("/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  res.send("Data posted successfully");
});

todosRouter.get("/:title", () => {});
todosRouter.put("/update-todo/:title", () => {});
todosRouter.delete("/delete-todo/:title", () => {});
```

## 7. Connecting MongoDB to Express

```tsx
// server.ts
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://<db_name>:<db_password>@cluster0.qcj0e7o.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const bootstrap = async () => {
  await client.connect();
  console.log("database connected!");

  const db = await client.db("todosDB");
  const collection = await db.collection("todos").insertOne({
    title: "MongoDb",
    body: "MongoDb",
  });
  console.log("collection", collection);

  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};
bootstrap();
```

## 8. Creating & Reading Todos

```tsx
// src -> config -> mongodb.ts  // uri and client exported from this file

// todos.routes.ts
todosRouter.get("/", async (req: Request, res: Response) => {
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const cursor = collection.find({});
  const todos = await cursor.toArray();

  res.json(todos);
});

// create a todo using postman
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
```

## 9. Get single Todo and update Todo

```tsx
// get a single todo
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const todo = await collection.findOne({ _id: new ObjectId(id) });

  res.json(todo);
});

// update a todo
todosRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, priorigy, isCompleted } = req.body;

  const db = await client.db("todosDB");
  const collection = await db.collection("todos");

  const filter = { _id: new ObjectId(id) };
  const updatedTodo = await collection.updateOne(
    filter,
    { $set: { title, description, priority, isCompleted } },
    { upsert: true }
  );

  res.json(updatedTodo);
});

// delete a todo
todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const db = await client.db("todosDB");
  const collection = await db.collection("todos");
  await collection.deleteOne({ _id: new ObjectId(id) });
  res.json({
    message: "deleted successfully",
  });
});
```

## 10. Middleware & Error Handling in Express

```tsx
// app.ts
app.get(
  "/error",
  (req: Request, res: Response, next: NextFunction) => {
    console.log({
      url: req.url,
      method: req.method,
      header: req.header,
    });
    next();
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(something);
      res.send("Welcome to Error World");
    } catch (error) {
      next(error);
    }
  }
);

// get all route
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

// global error handler at last
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    console.log("Error", error);
    res
      .status(400)
      .json({ message: "Something went wrong from global error handler" });
  }
});
```
