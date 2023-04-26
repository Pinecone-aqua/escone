import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}
  recipes = [];

  async addRecipe(recipe: RecipeDto) {
    const result = await this.recipeModel.create(recipe);
    return result;
  }

  async getRecipes() {
    const result = await this.recipeModel.find({ status: 'pending' });
    return result;
  }

  async getRecipe(id: string) {
    const result = await this.recipeModel.findOne({ _id: id });
    return `selected recipe: ${result}`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    const result = await this.recipeModel.updateOne({ _id: id });
    return `edited recipe: ${result}`;
  }

  async deleteRecipe(id: string) {
    const result = await this.recipeModel.deleteOne({ _id: id });
    return `deleted recipe: ${result}`;
  }
  async getPendingRecipes() {
    const result = await this.recipeModel.find();
    return result;
  }
}
