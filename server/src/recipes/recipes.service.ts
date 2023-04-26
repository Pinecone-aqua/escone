import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';
import { User } from 'src/users/user.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  recipes = [];

  async addRecipe(recipeDto: RecipeDto, created_by: string) {
    const creator = await this.userModel.findById(created_by);
    const createdRecipe = await this.recipeModel.create({
      ...recipeDto,
      created_by: creator.username,
    });
    return createdRecipe;
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
