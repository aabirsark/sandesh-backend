import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user_model";

class DatabaseOperations {
  static async addUser(
    username: any,
    password: any,
    fullname: any,
    joinedAt: any,
    phone: any,
    active: any,
    socket: any
  ): Promise<boolean> {
    const _saltRounds = 10;
    const salt = await bcrypt.genSalt(_saltRounds);
    const encryptedPassword = await bcrypt.hash(password, salt);

    let userData = User.set({
      username,
      fullname,
      password: encryptedPassword,
      joinedAt,
      active,
      socket,
      phone,
    });

    await userData.save();

    return true;
  }

  static async getAllUsers(req: Request, res: Response) {
    let users = await User.find();

    let providingData = [];

    for (let index = 0; index < users.length; index++) {
      const element = users[index];
      let userInfo = {
        id: element._id,
        username: element.username,
        phone: element.phone,
        socket: element.socket,
      };
      providingData.push(userInfo);
    }

    res.status(200).json({
      data: providingData,
    });
  }

  static async updateUser(
    username: any,
    password: any,
    fullname: any,
    joinedAt: any,
    phone: any,
    active: any,
    socket: any
  ) {
    let UpdatedData = {
      fullname: fullname,
      password: password,
      joinedAt: joinedAt,
      active: active,
      socket: socket,
      phone: phone,
    };

    User.updateOne(
      {
        username: username,
      },
      UpdatedData
    ).catch((err) => {
      console.log("error");
      return {
        feedback: "user updation unsuccessfull",
        error: true,
        updatedData: UpdatedData,
      };
    });

    return {
      feedback: "user successfully updated",
      error: false,
      updatedData: UpdatedData,
    };
  }
}

export { DatabaseOperations };
