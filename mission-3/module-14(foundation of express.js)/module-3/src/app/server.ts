import { client } from "../config/mongodb";
import app from "./app";

let server;
const port = 5000;

const bootstrap = async () => {
  await client.connect();
  console.log("database connected");

  server = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

bootstrap();
