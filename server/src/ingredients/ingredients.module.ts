import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IngredientController } from './ingredients.controller';
import { Ingredient, IngredientSchema } from './ingredients.schema';
import { IngredientService } from './ingredients.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientController],
  providers: [IngredientService],
})
export class IngredientModel {}
