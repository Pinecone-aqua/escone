import express, { Request, Response } from "express";
import { emailChecker, roleCheker } from "../middlewares/checkers";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../service/userServie";
import { UserType } from "../utils/types";

const User = express.Router();

User.get("/users", async (req: Request, res: Response): Promise<void> => {
  const result: UserType[] = await getUsers();
  res.send(result).status(200);
});

User.get("/user", async (req: Request, res: Response): Promise<void> => {
  try {
    const id: any = req.query.id;
    const result: UserType | null = await getUser(id);
    console.log(result);
    res.send(result).status(200);
  } catch (error) {
    console.log(error);
  }
});

User.post(
  "/user",
  emailChecker,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const newUser: any = req.body;
      const result = await createUser(newUser);
      res.send(result).status(200);
    } catch (error) {
      res.send(error).status(400);
    }
  }
);

User.delete("/user", roleCheker, async (req: Request, res: Response) => {
  const id: any = req.query.id;
  console.log(req.body);

  const result = await deleteUser(id);
  res.send(result).status(200);
});

User.put("/user", async (req: Request, res: Response) => {
  const result = updateUser();
});

export default User;
