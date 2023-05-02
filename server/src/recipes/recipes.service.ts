import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';
import { Category } from 'src/categories/categories.schema';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  recipes = [];

  async addRecipe(recipeDto: RecipeDto) {
    const createdRecipe = await this.recipeModel.create({
      ...recipeDto,
    });
    return createdRecipe;
  }

  async getRecipes() {
    const result = await this.recipeModel.find({ status: 'approve' });

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
  async recipeApprove(id: string) {
    const result = await this.recipeModel.updateOne(
      { _id: id },
      { status: 'approve' },
    );
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    const result = await this.recipeModel.updateOne({ _id: id });
    return result;
  }
  async getFilterRecipe(filter: any) {
    console.log(filter);
    const catRawIds = await this.categoryModel.find(
      { name: filter.cat },
      { _id: 1 },
    );
    const catIds = catRawIds.map((id) => id._id);
    const filteredRecipes = await this.recipeModel.find({
      categories: '6438bb05d4f6f42f7c57cfec',
    });
    console.log(catIds);
    console.log(filteredRecipes);
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
