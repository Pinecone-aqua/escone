import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipes.schema';
import { Model } from 'mongoose';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class RecipesService {
  constructor(@InjectModel(Recipe.name) private recipeModel: Model<Recipe>) {
    cloudinaryV2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImageToCloudinary(image: Express.Multer.File): Promise<string> {
    const result = await cloudinaryV2.uploader.upload(image.path);
    console.log(result);
    return result.secure_url;
  }

  async create(createRecipeDto: CreateRecipeDto) {
    const createdRecipe = await this.recipeModel.create({ createRecipeDto });
    return createdRecipe;
  }

  async findAll() {
    const allRecipes = await this.recipeModel.find();
    return allRecipes;
  }

  async findOne(id: string) {
    const selectedRecipe = await this.recipeModel
      .findOne({ _id: id })
      .populate('categories')
      .populate('tags')
      .populate('ingredients');
    return selectedRecipe;
  }

  async pending() {
    const pendingRecipe = await this.recipeModel.find({ status: 'pending' });
    return pendingRecipe;
  }

  async approve(id: string) {
    const approvedRecipe = await this.recipeModel.updateOne(
      { _id: id },
      { status: 'approved' },
    );
    return approvedRecipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const updatedRecipe = await this.recipeModel.updateOne(
      { _id: id },
      updateRecipeDto,
    );
    return updatedRecipe;
  }

  async remove(id: string) {
    const deletedRecipe = await this.recipeModel.deleteOne({ _id: id });
    return deletedRecipe;
  }
}
