import express, { application } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./configs/database.config";
import { route } from "./routers/router";

// ? configs
dotenv.config();
connectDatabase();

// ? app setup
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", route);

const port = process.env.PORT || 8000;

app.set("port", port);

// ? listen to server
app.listen(app.get("port"), () => {
  console.log(`Server started at ${app.get("port")}`);
});
