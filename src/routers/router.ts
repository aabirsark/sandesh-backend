import { Request, Response, Router } from "express";
import { AuthController } from "../controller/auth.controller";
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

export { route };
