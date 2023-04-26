import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Recipe {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  images: string[];
  @Prop()
  categories: string[];
  @Prop()
  tags: string[];
  @Prop()
  ingredients: string[];
  @Prop()
  cook_time: number;
  @Prop()
  servings: number;
  @Prop()
  created_by: string;
  @Prop()
  created_date: string;
  @Prop()
  status: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
