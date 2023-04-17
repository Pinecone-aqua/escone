import mongoose, { model, Schema } from "mongoose";
import { RecipeType } from "../utils/types";

const RecipeSchema = new Schema<RecipeType>(
  {
    _id: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    images: [String],
    title: String,
    description: String,
    ingredients: [String],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "categories" }],
    tags: [String],
    servings: Number,
    cook_time: Number,
    created_date: Date,
  },
  {
    collection: "recipes",
  }
);
const RecipeModel = model<RecipeType>("recipe", RecipeSchema, "recipes");
export default RecipeModel;
