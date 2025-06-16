const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  //   console.log(url, "url");

  //   console.log(req.url, req.method);
  // GET all todos
  if (pathname === "/todos" && req.method === "GET") {
    // res.setHeader("Content-Type", "text/plain");
    // res.setHeader("email", "mr@gmail.com");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(data);
  }
  // POST a todo
  else if (pathname === "/todos/create-todo" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      //   console.log(data);
      const { title, body } = JSON.parse(data);
      //   console.log({ title, body });

      const createdAt = new Date().toISOString();
      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);

      parseAllTodos.push({ title, body, createdAt });
      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });
      //   console.log(parseAllTodos);
      res.end(JSON.stringify({ title, body, createdAt }), null, 2);
    });

    // res.end("todo created");
  }

  // GET a single todo
  else if (pathname.startsWith("/todo") && req.method === "GET") {
    const title = url.searchParams.get("title");
    // console.log(title);
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);

    const singleTodo = parsedData.find((todo) => todo.title === title);
    const stringifiedSingleTodo = JSON.stringify(singleTodo);
    // console.log(stringifiedSingleTodo);

    res.end(stringifiedSingleTodo);
  }

  // PATCH update a todo
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");

    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      //   console.log(data);
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);

      const todoIndex = parseAllTodos.findIndex((todo) => todo.title === title);
      parseAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(
        JSON.stringify({
          title,
          body,
          createdAt: parseAllTodos[todoIndex].createdAt,
        }),
        null,
        2
      );
    });

    // res.end("todo created");
  }
  // delete a todo(http://localhost:5000/todos/update-todo?title=prisma)
  else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = url.searchParams.get("title");
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);

    const todo = parsedData.filter((todo) => todo.title !== title);
    fs.writeFileSync(filePath, JSON.stringify(todo, null, 2), {
      encoding: "utf-8",
    });

    res.end(JSON.stringify(todo), null, 2);
  }

  // if route not match
  else {
    res.end("not found");
  }
});

server.listen(5000, () => {
  console.log("server is running on port 5000");
});
