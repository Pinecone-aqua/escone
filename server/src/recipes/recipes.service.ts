import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { FilterQuery, Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as dayjs from 'dayjs';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(forwardRef(() => CloudinaryService))
    private readonly cloudinaryService: CloudinaryService,

    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
  ) {}

  async createRecipe(recipeDto: RecipeDto) {
    const createdRecipe = await this.recipeModel.create({
      ...recipeDto,
    });
    return createdRecipe;
  }

  async getRecipes(Query?: FilterQuery<Recipe>) {
    const result = await this.recipeModel
      .find(Query)
      .populate('categories')
      .populate('tags')
      .populate('created_by');
    return result;
  }
  async uploadImageToCloudinary(
    images: Express.Multer.File[],
  ): Promise<string[]> {
    const arr = [];
    await Promise.all(
      images?.map(async (file) => {
        const { secure_url } = await this.cloudinaryService.uploadImage(file);
        return arr.push(secure_url);
      }),
    );
    return arr;
  }

  async getRecipe(id: string) {
    const result = await this.recipeModel
      .findOne({ _id: id })
      .populate('categories')
      .populate('tags')
      .populate('created_by');

    return result;
  }
  async recipeStatus(id: string, status: string) {
    const result = await this.recipeModel.updateOne(
      { _id: id },
      { status: status },
    );
    return result;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    const result = await this.recipeModel.updateOne({ _id: id }, recipeDto);
    return result;
  }

  async deleteRecipe(id: string) {
    const result = await this.recipeModel.deleteOne({ _id: id });
    return result;
  }

  async getStatistics() {
    const recipes: any = await this.getRecipes();
    type popular = {
      name: string;
      count: number;
      _id?: string;
    };
    const ingredientStatus: popular[] = [];
    const tagsStatus: popular[] = [];
    const CategoryStatus: popular[] = [];
    const createStatus: popular[] = [];

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const existingIngredient = ingredientStatus.find(
          (pi) => pi.name === ingredient.name,
        );

        if (existingIngredient) {
          existingIngredient.count++;
        } else {
          ingredientStatus.push({ name: ingredient.name, count: 1 });
        }
      });
      recipe.categories.forEach((Category) => {
        const existingCategory = CategoryStatus.find(
          (pi) => pi.name === Category.name,
        );
        if (existingCategory) {
          existingCategory.count++;
        } else {
          CategoryStatus.push({
            name: Category.name,
            count: 1,
            _id: Category._id,
          });
        }
      });
      recipe.tags.forEach((tag) => {
        const existingTags = tagsStatus.find((pi) => pi.name === tag.name);
        if (existingTags) {
          existingTags.count++;
        } else {
          tagsStatus.push({ name: tag.name, count: 1, _id: tag._id });
        }
      });

      const existingCategory = createStatus.find(
        (pi) => pi.name === dayjs(recipe.created_date).format('YYYY-MM-DD'),
      );
      if (existingCategory) {
        existingCategory.count++;
      } else {
        createStatus.push({
          name: dayjs(recipe.created_date).format('YYYY-MM-DD'),
          count: 1,
        });
      }
    });
    return { ingredientStatus, tagsStatus, CategoryStatus, createStatus };
  }
}
