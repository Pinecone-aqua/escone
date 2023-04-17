import express, { Request, Response } from "express";
import { recipeChecker } from "../middlewares/checkers";
import { createRecipe, getRecipe, getRecipes } from "../service/recipeService";

const recipe = express.Router();

recipe.get("/recipes", async (req: Request, res: Response) => {
  const result = await getRecipes();
  res.send(result).status(200);
});

recipe.get("/recipe", async (req: Request, res: Response) => {
  const id: any = req.query.id;
  const result = await getRecipe(id);
  res.send(result).status(200);
});

recipe.post("/recipe", recipeChecker, async (req: Request, res: Response) => {
  const newRecipe = req.body;
  const result = await createRecipe(newRecipe);
  res.send(result).status(200);
});

export default recipe;
