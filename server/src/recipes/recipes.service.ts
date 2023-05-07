import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';
import { Category } from 'src/categories/categories.schema';
import { Ingredient } from 'src/ingredients/ingredients.schema';
import { Tag } from 'src/tags/tags.schema';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {
    cloudinaryV2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
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
  async uploadImageToCloudinary(image: Express.Multer.File): Promise<string> {
    const result = await cloudinaryV2.uploader.upload(image.path);
    console.log(result);
    return result.secure_url;
  }
  async getRecipe(id: string) {
    const result = await this.recipeModel
      .findOne({ _id: id })
      .populate('categories')
      .populate('tags')
      .populate('ingredients');
    return [result];
  }
  async recipeApprove(id: string) {
    const result = await this.recipeModel.updateOne(
      { _id: id },
      { status: 'approve' },
    );
    return result;
  }
  async recipeDeny(id: string) {
    const result = await this.recipeModel.deleteOne(
      { _id: id },
      { status: 'deny' },
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
    const ingRawIds = await this.ingredientModel.find(
      { name: filter.ing },
      { _id: 1 },
    );
    const tagRawIds = await this.tagModel.find(
      { name: filter.tag },
      { _id: 1 },
    );
    const catIds = catRawIds.map((id) => {
      return {
        categories: id._id,
      };
    });
    const tagIds = tagRawIds.map((id) => {
      return {
        tags: id._id,
      };
    });
    const ingIds = ingRawIds.map((id) => {
      return {
        ingredients: id._id,
      };
    });

    const filteredRecipes = await this.recipeModel.find({
      $and: [...catIds, ...ingIds, ...tagIds],
    });
    console.log([...catIds, ...ingIds, ...tagIds]);
    console.log(filteredRecipes);
    return filteredRecipes;
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
