import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import "./configs/mongooseConfig";
import User from "./controller/userRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(User);

app.listen(PORT, () => {
  console.log(`port: http://localhost:${PORT}`);
});
