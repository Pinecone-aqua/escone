import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';

@Injectable()
export class RecipeService {
  [x: string]: any;
  addRecipe: any;
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {}
  recipes = [];
  async getAllRecipes() {
    const result = await this.recipeModel.find({});
    console.log('all recipes: ', result);
    return result;
  }
}
