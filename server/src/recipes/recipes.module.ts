import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './recipe.schema';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipes.service';
import { userModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    userModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class recipeModule {}
