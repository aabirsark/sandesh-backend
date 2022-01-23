import express, { application } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./configs/database.config";
import { route } from "./routers/router";
import { createServer } from "http";

import io, { Socket } from "socket.io";

// ? configs
dotenv.config();
connectDatabase();

// ? app setup
const app = express();
const httpServer = createServer(app);
const i = io(httpServer);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use("/", route);

const port = process.env.PORT || 8000;

let users = Array<string>();

i.on("connection", (socket) => {
  console.log("User Connected");
  console.log(socket.handshake.query.username);
});

// ? listen to server
httpServer.listen(port, () => console.log("Server Connnected At 8000"));

// ? Socket connection
