import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Database Connected Succesfully`);
    })
    .catch((e) => {
      console.log(`Error while connecting with Database ${e}`);
    });
};

export default connectDB;
