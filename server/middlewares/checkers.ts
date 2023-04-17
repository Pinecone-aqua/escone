import { NextFunction, Request, Response } from "express";
import UserModel from "../model/userModel";

export async function emailChecker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const email: string = req.body.email;
  const isEmail =
    (await UserModel.find({ email: email }).limit(1)).length === 1;
  if (isEmail) {
    return res
      .status(403)
      .send({ message: "You have already signed the petition" });
  } else {
    next();
  }
}

export async function roleCheker(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const role = req.body.role;
  if (!role) {
    return res.status(403).send({ message: "You can't user delete" });
  } else {
    next;
  }
}
