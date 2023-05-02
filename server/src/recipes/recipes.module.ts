import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './recipe.schema';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipes.service';
import { Category, CategorySchema } from 'src/categories/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Recipe.name, schema: RecipeSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class recipeModule {}
