import mongoose, { model, Schema } from "mongoose";
import { RecipeType } from "../utils/types";
import CategoryModel from "./categoryModel";
import IngredientModel from "./IngredientModel";
import TagModel from "./tagModel";

const RecipeSchema = new Schema<RecipeType>(
  {
    _id: String,
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    images: [String],
    title: String,
    description: String,
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: IngredientModel,
    },
    categories: { type: [mongoose.Schema.Types.ObjectId], ref: CategoryModel },
    tags: { type: [mongoose.Schema.Types.ObjectId], ref: TagModel },
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
