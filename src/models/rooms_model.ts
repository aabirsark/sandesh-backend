import mongoose from "mongoose";

const roomSchemea = new mongoose.Schema({
  roomname: String,
  roomSecretCode: String,
  adminUsername: String,
  participants: [
    {
      username: String,
      phone: String,
    },
  ],
});

const Room = mongoose.model("room", roomSchemea);

export {Room};