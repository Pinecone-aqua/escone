import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}
  recipes = [];

  async addRecipe(recipeDto: RecipeDto) {
    const createdRecipe = await this.recipeModel.create({
      ...recipeDto,
    });
    return createdRecipe;
  }

  async getRecipes() {
    const result = await this.recipeModel.find();

    return result;
  }

  async getRecipe(id: string) {
    const result = await this.recipeModel
      .findOne({ _id: id })
      .populate('categories')
      .populate('tags')
      .populate('ingredients');
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    const result = await this.recipeModel.updateOne({ _id: id });
    return result;
  }

  async deleteRecipe(id: string) {
    const result = await this.recipeModel.deleteOne({ _id: id });
    return result;
  }
  async getPendingRecipes() {
    const result = await this.recipeModel.find({ status: 'pending' });
    return result;
  }
}
