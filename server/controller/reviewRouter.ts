import express, { Request, Response } from "express";
import { getReviews } from "../service/reviewService";

const review = express.Router();

review.get("/reviews", async (req: Request, res: Response) => {
  const id = req.query.id;
  const result = await getReviews(id);
  res.send(result).status(200);
});

export default review;
