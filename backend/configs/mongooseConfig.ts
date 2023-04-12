import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(`${process.env.MONGOOSE_CONNECT_KEY}`)
  .then(() => {
    console.log("successfully connected to mongoose");
  })
  .catch((error) => {
    console.log(`mongoose connection error: ${error}`);
  });

export default mongoose.connection;