import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './recipe.schema';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipes.service';
import { Category, CategorySchema } from 'src/categories/categories.schema';
import {
  Ingredient,
  IngredientSchema,
} from 'src/ingredients/ingredients.schema';
import { Tag, TagSchema } from 'src/tags/tags.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Ingredient.name, schema: IngredientSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class recipeModule {}
