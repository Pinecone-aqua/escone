import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema()
export class Recipe {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  images: string[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: ObjectId[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
  tags: ObjectId[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredients: ObjectId[];
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
