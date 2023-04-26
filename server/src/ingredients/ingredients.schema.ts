import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  _id: string;
  name: string;
  quintity: number;
  measure: string;
  picture: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
