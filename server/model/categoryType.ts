import { model, Schema } from "mongoose";
import { CategoryType } from "../utils/types";

const CategorySchema = new Schema<CategoryType>({
  _id: String,
  name: String,
  picture: String,
});

const CategoryModel = model<CategoryType>("categories", CategorySchema);

export default CategoryModel;
