import IO, { Socket } from "socket.io";
import { ActiveUsers } from "../app";

export class SocketEvent {
  static onChatMessageEvent(data: any) {
    if (ActiveUsers[data.to]) {
      ActiveUsers[data.to].emit("newChatMsg", data);
    } else {
      console.log("User not active");
    }
  }

  static onJoinRoomsEvent(data: any, socket: Socket) {
    for (let index = 0; index < data.length; index++) {
      console.log(data[index]);
      socket.join(data[index]);
    }
  }
}
