import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId, Types } from 'mongoose';
import { Category } from 'src/categories/categories.schema';
import { Ingredient } from 'src/ingredients/ingredients.schema';
import { Tag } from 'src/tags/tags.schema';

@Schema()
export class Recipe {
  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // _id: ObjectId;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  images: string[];
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Category.name }],
  })
  categories: Types.ObjectId[];
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Tag.name }] })
  tags: Types.ObjectId[];
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Ingredient.name }],
  })
  ingredients: Types.ObjectId[];
  @Prop()
  cook_time: number;
  @Prop()
  method: [{ ['number']: string }];
  @Prop()
  servings: number;
  @Prop()
  created_by: string;
  @Prop()
  created_date: string;
  @Prop()
  status: string;
  @Prop({ type: { rating: Number, vote: Number } })
  rate: { rating: number; vote: number };
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
