import { model, Schema } from "mongoose";
import { IngredientType } from "../utils/types";

const IngredientSchema = new Schema<IngredientType>({
  _id: String,
  name: String,
  quintity: Number,
  measure: String,
  picture: String,
});

const IngredientModel = model<IngredientType>("ingredient", IngredientSchema);

export default IngredientModel;
