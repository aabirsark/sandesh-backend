import { Request, Response, Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { RoomsController } from "../controller/room.controller";
import { DatabaseOperations } from "../database/databaseCRUD";

const route = Router();

route.get("/", (req: Request, res: Response) => {
  return res.send({
    data: "Welcome to Sandesh Server",
  });
});

route.post("/login", AuthController.loginUser);
route.post("/createUser", AuthController.createUser);

route.get("/users", DatabaseOperations.getAllUsers);
route.post("/updateData", AuthController.updateData);

route.post("/createNewRoom", RoomsController.createRoom);
route.post("/joinRoom", RoomsController.joinRoom);
route.get("/roomParti", RoomsController.getParticipants);

export { route };
