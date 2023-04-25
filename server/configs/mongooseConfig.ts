import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(`${process.env.MONGODB_CONNECT_URL}`)
  .then(() => {
    console.log("successfully connected to mongoose");
  })
  .catch((error) => {
    console.log(`mongoose connection error: ${error}`);
  });

export default mongoose.connection;
