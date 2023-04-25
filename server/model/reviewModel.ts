import { syncBuiltinESMExports } from "module";
import mongoose, { model, Schema } from "mongoose";
import { ReviewType } from "../utils/types";

const reviewSchema = new Schema<ReviewType>({
  _id: String,
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  recipe_id: String,
  rate: Number,
  content: String,
  created_date: Date,
});

const ReviewModel = model<ReviewType>("review", reviewSchema);

export default ReviewModel;
