import express from "express";
import { getUsers } from "../service/userServie";

const User = express.Router();

User.get("/users", async (req, res) => {
  const result = await getUsers();
  res.send(result).status(200);
});

export default User;
