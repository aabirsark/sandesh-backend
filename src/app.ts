import express, { application } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./configs/database.config";
import { route } from "./routers/router";
import { createServer } from "http";

import io, { Socket } from "socket.io";
import { SocketEvent } from "./websockets/socket_events.socket";

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

// ? listen to server
httpServer.listen(port, () => console.log("Server Connnected At 8000"));

// ? Socket connection
let ActiveUsers: { [id: string]: io.Socket } = {};

i.on("connection", (socket) => {
  console.log("User Connected");
  // ? set In Active Users
  ActiveUsers[socket.handshake.query.username] = socket;
  console.log(ActiveUsers);

  // ? on disconnect remove users from active users
  socket.on("disconnect", (data) => {
    delete ActiveUsers[socket.handshake.query.username];
    console.log(ActiveUsers);
  });

  socket.on("msg", SocketEvent.onChatMessageEvent);
});

// ? exports
export { ActiveUsers };
