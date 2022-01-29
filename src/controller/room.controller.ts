import bcrypt, { compare } from "bcrypt";
import { Request, Response } from "express";
import { DatabaseOperations } from "../database/databaseCRUD";
import { Room } from "../models/rooms_model";

export class RoomsController {
  static async createRoom(req: Request, res: Response) {
    let { roomname, secretcode, adminName, phoneNumber } = req.body;

    var roomExists = await Room.findOne({
      roomSecretCode: secretcode,
    });

    if (roomExists) {
      return res.send({
        feedback: "Secret code is already booked",
        error: true,
        data: {},
      });
    }

    if (!roomname || !secretcode || !adminName || !phoneNumber) {
      return res.send({
        feedback: "All fields are required",
        error: true,
        data: {},
      });
    }

    // ? Create Room
    var roomData = await Room.create({
      roomname: roomname,
      roomSecretCode: secretcode,
      adminUsername: adminName,
      participants: [
        {
          username: adminName,
          phone: phoneNumber,
        },
      ],
    });

    return res.send({
      feedback: "Room Created",
      error: false,
      data: {
        roomname: roomData.roomname,
        adminName: roomData.adminUsername,
        code: secretcode,
      },
    });
  }

  static async joinRoom(req: Request, res: Response) {
    let { code, participantUsername, participantPhone } = req.body;

    var findRoom = await Room.findOne({ roomSecretCode: code });

    if (!code || !participantUsername || !participantPhone) {
      return res.send({
        feedback: "All fields are required",
        error: true,
        data: {},
      });
    }

    if (!findRoom) {
      return res.send({
        feedback: "Room not found",
        error: true,
        data: {},
      });
    }

    var updateData = await Room.updateOne(
      { roomSecretCode: code },
      {
        $push: {
          participants: [
            {
              username: participantUsername,
              phone: participantPhone,
            },
          ],
        },
      }
    );

    return res.send({
      feedback: "Participant Added",
      error: false,
      data: {
        roomname: findRoom.roomname,
        adminName: findRoom.adminUsername,
        code: code,
      },
    });
  }

  static async getParticipants(req: Request, res: Response) {
    let { code } = req.body;

    if (!code) {
      return res.send({
        feedBack: "Field {code} is required",
        error: true,
        data: [],
      });
    }

    var roomExists = await Room.findOne({
      roomSecretCode: code,
    });

    if (!roomExists) {
      return res.send({
        feedBack: "Room Not Found",
        error: true,
        data: [],
      });
    }

    res.send({
      feedBack: "Data found",
      error: false,
      data: roomExists.participants,
    });
  }
}
