import mongoose from "mongoose";

interface UserModel {
  username: string;
  fullname: string;
  password: string;
  phone: string;
  joinedAt: string;
  active: string;
  socket: string;
}

interface UserDocument extends mongoose.Document {
  username: string;
  fullname: string;
  password: string;
  phone: string;
  joinedAt: string;
  active: boolean;
  socket: string;
}

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: String,
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  joinedAt: String,
  active: Boolean,
  socket: String,
});

interface userModelInterface extends mongoose.Model<UserDocument> {
  set(x: UserModel): UserDocument;
}

userScheme.statics.set = (x: UserModel) => {
  return new User(x);
};

const User = mongoose.model<UserDocument, userModelInterface>(
  "user",
  userScheme
);

export {User};