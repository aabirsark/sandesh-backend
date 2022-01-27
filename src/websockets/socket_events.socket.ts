import IO from "socket.io";
import { ActiveUsers } from "../app";

export class SocketEvent {
  static onChatMessageEvent(data: any) {
    console.log(data);
    if (ActiveUsers[data.to]) {
      ActiveUsers[data.to].emit("newChatMsg", data);
    } else {
      console.log("User not active");
    }
  }
}
