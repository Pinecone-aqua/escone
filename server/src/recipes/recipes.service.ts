import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipes.schema';
import { Model } from 'mongoose';
import { Category } from 'src/categories/categories.schema';
import { Ingredient } from 'src/ingredients/ingredients.schema';
import { Tag } from 'src/tags/tags.schema';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class RecipesService {
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
    const allRecipes = await this.recipeModel.find({ status: 'approved' });
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

  async filter(filter: any) {
    console.log(filter);
    const catRawIds = await this.categoryModel.find(
      { name: filter.cat },
      { _id: 1 },
    );
    const catIds = catRawIds.map((id) => {
      return {
        categories: id._id,
      };
    });

    const ingRawIds = await this.ingredientModel.find(
      { name: filter.ing },
      { _id: 1 },
    );
    const ingIds = ingRawIds.map((id) => {
      return {
        ingredients: id._id,
      };
    });

    const tagRawIds = await this.tagModel.find(
      { name: filter.tag },
      { _id: 1 },
    );
    const tagIds = tagRawIds.map((id) => {
      return {
        tags: id._id,
      };
    });

    const filteredRecipes = await this.recipeModel.find({
      $and: [...catIds, ...ingIds, ...tagIds],
    });
    console.log([...catIds, ...ingIds, ...tagIds]);
    return filteredRecipes;
  }
}
