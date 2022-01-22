import mongoose from "mongoose";

export const connectDatabase = async () => {
  // ? let's connect to the user database
  await mongoose
    .connect(process.env.MONGO_URL as string)
    .then(() => {
      console.log("Mongo Database Connected");
    })
    .catch((err) => {
      console.log(err, "happend can't connect to database");
    });
};
