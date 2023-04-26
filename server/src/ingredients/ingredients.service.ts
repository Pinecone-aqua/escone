import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ingredient } from './ingredients.schema';

@Injectable()
export class IngredientService {
  constructor(
    @InjectModel(Ingredient.name) private ingredientModel: Model<Ingredient>,
  ) {}
  async getAllIngredient() {
    const result = await this.ingredientModel.find();
    return result;
  }
  async deleteIngredient(id: string) {
    const result = await this.ingredientModel.deleteOne({ _id: id });
    return result;
  }
}
