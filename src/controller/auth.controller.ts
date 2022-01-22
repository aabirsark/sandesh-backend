import bcrypt, { compare } from "bcrypt";
import { Request, Response } from "express";
import { DatabaseOperations } from "../database/databaseCRUD";
import { User } from "../models/user_model";

export class AuthController {
  static async createUser(req: Request, res: Response) {
    let { username, password, fullname, joinedAt, phone, active, socket } =
      req.body;

    if (!username || !password || !fullname || !phone) {
      return res.send({
        feedback: "All Fields are required",
        data: {},

        error: true,
      });
    }

    let userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.send({
        feedback: "User already exists",
        data: {},
        error: true,
      });
    }

    let userAdded = await DatabaseOperations.addUser(
      username,
      password,
      fullname,
      joinedAt,
      phone,
      active,
      socket
    );

    let userData = await User.findOne({ username: username });

    return res.send({
      feedback: "User loged in",
      data: {
        id: userData!._id,
        username: userData!.username,
        name: userData!.fullname,
      },
      error: false,
    });
  }

  static async loginUser(req: Request, res: Response) {
    let { username, password } = req.body;

    if (!username || !password) {
      return res.send({
        feedback: "All fields are required",
        data: {},
        error: true,
      });
    }

    let userData = await AuthController._loginUser(username, password);

    return res.send(userData);
  }

  static async _loginUser(username: string, password: string) {
    let userExists = await User.findOne({ username: username });

    if (!userExists) {
      return {
        feedback: "User not found",
        data: {},
        error: true,
      };
    }

    const comparedPassword = await compare(password, userExists.password);
    if (comparedPassword) {
      return {
        feedback: `Loged in as ${userExists!.username}`,
        data: {
          id: userExists!._id,
          username: username,
          name: userExists!.fullname,
        },
        error: false,
      };
    } else {
      return {
        feedback: `worng password`,
        data: {},
        error: true,
      };
    }
  }

  static async updateData(req: Request, res: Response) {
    let { username, password, fullname, joinedAt, phone, active, socket } =
      req.body;

    let userExists = await User.findOne({ username: username });

    const _saltRounds = 10;
    const salt = await bcrypt.genSalt(_saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    if (userExists && (await compare(password, userExists.password))) {
      let updateResponse = await DatabaseOperations.updateUser(
        username,
        encryptedPassword,
        fullname,
        joinedAt,
        phone,
        active,
        socket
      );
      return res.send(updateResponse);
    }

    return res.send({
      data: "User not found",
      error: true,
    });
  }
}
