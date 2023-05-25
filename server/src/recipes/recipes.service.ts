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
    try {
      const createdRecipe = await this.recipeModel.create({
        ...recipeDto,
      });
      return createdRecipe;
    } catch (error) {
      return error;
    }
  }
  async getRecipesIds() {
    try {
      const recipeIds = this.recipeModel.find({}).select({ _id: 1 });
      return recipeIds;
    } catch (error) {
      return error;
    }
  }
  async getRecipes(
    Query?: FilterQuery<Recipe>,
    limit?: number,
    page?: number,
    order_by?,
  ) {
    try {
      const result = await this.recipeModel
        .find(Query)
        .populate('categories')
        .populate('tags')
        .populate('created_by')
        .sort(order_by)
        .skip((page - 1) * limit)
        .limit(limit);
      return result;
    } catch (error) {
      return error;
    }
  }
  async uploadImageToCloudinary(
    images: Express.Multer.File[],
  ): Promise<string[]> {
    try {
      const arr = [];
      await Promise.all(
        images?.map(async (file) => {
          const { secure_url } = await this.cloudinaryService.uploadImage(file);
          return arr.push(secure_url);
        }),
      );
      return arr;
    } catch (error) {
      return error;
    }
  }

  async getRecipe(id: string) {
    try {
      const result = await this.recipeModel
        .findOne({ _id: id })
        .populate('categories')
        .populate('tags')
        .populate('created_by');

      return result;
    } catch (error) {
      return error;
    }
  }
  async recipeStatus(id: string, status: string) {
    try {
      const result = await this.recipeModel.updateOne(
        { _id: id },
        { status: status },
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    try {
      const result = await this.recipeModel.updateOne({ _id: id }, recipeDto);
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteRecipe(id: string, recipe: any) {
    const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
    console.log('whis');
    const getPublicIdFromUrl = (url: string) => {
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    try {
      const { images } = recipe;
      const publicIds = images.map((url: string) => getPublicIdFromUrl(url));
      console.log(publicIds);
      const destroyResponses = await Promise.all(
        publicIds.map((publicId: string) =>
          this.cloudinaryService.deleteImage(publicId),
        ),
      );
      console.log(destroyResponses);

      const allDestroyed = destroyResponses.every(
        (response) => response.result === 'ok',
      );
      if (allDestroyed) {
        await this.recipeModel.deleteOne({ _id: recipe.id });
        return true;
      } else {
        // Handle the case where some images failed to delete
        return false;
      }
    } catch (err) {
      return err;
    }
  }

  async getStatistics() {
    try {
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
    } catch (error) {
      return error;
    }
  }
}
