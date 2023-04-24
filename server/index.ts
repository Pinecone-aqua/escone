import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import "./configs/mongooseConfig";
import User from "./controller/userRouter";
import recipe from "./controller/recipesRuoter";
import review from "./controller/reviewRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(User);
app.use(recipe);
app.use(review);
app.listen(PORT, () => {
  console.log(`port: http://localhost:${PORT}`);
});
