import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Ingredient {
  // @Prop()
  // _id: string;
  @Prop()
  name: string;
  @Prop()
  quintity: number;
  @Prop()
  measure: string;
  @Prop()
  picture: string;
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient);
