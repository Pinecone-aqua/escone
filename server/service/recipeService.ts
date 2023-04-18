import RecipeModel from "../model/recipeModel";
import { RecipeType } from "../utils/types";

export async function getRecipes(): Promise<RecipeType[]> {
  const result = await RecipeModel.find({});
  return result;
}

export async function getRecipe(id: string): Promise<RecipeType | null> {
  const result: RecipeType | null = await RecipeModel.findOne({
    _id: id,
  })
    .populate({ path: "created_by", select: "username image" })
    .populate("categories")
    .populate("ingredients")
    .populate("tags");

  return result;
}

export async function createRecipe(newRecipe: RecipeType) {
  const result = await RecipeModel.insertMany(newRecipe);
  return result;
}
