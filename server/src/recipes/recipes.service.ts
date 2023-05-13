import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Recipe } from './recipe.schema';
import { Model } from 'mongoose';
import { RecipeDto } from './dto/recipe.dto';
import { Category } from 'src/categories/categories.schema';
import { Ingredient } from 'src/ingredients/ingredients.schema';
import { Tag } from 'src/tags/tags.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as dayjs from 'dayjs';

@Injectable()
export class RecipeService {
  constructor(
    @Inject(forwardRef(() => CloudinaryService))
    private readonly cloudinaryService: CloudinaryService,

    @InjectModel(Recipe.name) private recipeModel: Model<Recipe>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
    @InjectModel(Tag.name) private tagModel: Model<Tag>,
  ) {}

  async addRecipe(recipeDto: RecipeDto) {
    const createdRecipe = await this.recipeModel.create({
      ...recipeDto,
    });
    return createdRecipe;
  }

  async getRecipes() {
    const result = await this.recipeModel
      .find()
      .limit(8)
      .populate('categories')
      .populate('tags')
      .populate('created_by');
    return result;
  }
  async uploadImageToCloudinary(
    images: Express.Multer.File[],
  ): Promise<string[]> {
    const arr = [];
    console.log(images);
    await Promise.all(
      images?.map(async (file) => {
        const { secure_url } = await this.cloudinaryService.uploadImage(file);
        return arr.push(secure_url);
      }),
    );
    return arr;
  }
  async getUserRecipe(userId: string) {
    const result = await this.recipeModel
      .find({ created_by: userId })
      .populate('categories')
      .populate('tags')
      .populate('created_by');

    return result;
  }
  async getRecipe(id: string) {
    const result = await this.recipeModel
      .findOne({ _id: id })
      .populate('categories')
      .populate('tags')
      .populate('created_by');

    return result;
  }
  async recipeApprove(id: string) {
    const result = await this.recipeModel.updateOne(
      { _id: id },
      { status: 'approve' },
    );
    return result;
  }
  async recipeDeny(id: string) {
    console.log(id);
    const result = await this.recipeModel.updateOne(
      { _id: id },
      { status: 'deny' },
    );
    console.log(result);
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async editRecipe(id: string, recipeDto: RecipeDto) {
    const result = await this.recipeModel.updateOne({ _id: id }, recipeDto);
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

  async getStatus() {
    const recipes: any = await this.getRecipes();
    type popular = {
      name: string;
      count: number;
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
          CategoryStatus.push({ name: Category.name, count: 1 });
        }
      });
      recipe.tags.forEach((tags) => {
        const existingTags = tagsStatus.find((pi) => pi.name === tags.name);
        if (existingTags) {
          existingTags.count++;
        } else {
          tagsStatus.push({ name: tags.name, count: 1 });
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
