import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Category } from 'src/categories/categories.schema';
import { Tag } from 'src/tags/tags.schema';
import { User } from 'src/users/user.schema';

export type IngredientType = {
  name: string;
  quantity: number;
  measure: string;
  picture: string;
};

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
  @Prop()
  ingredients: IngredientType[];
  @Prop()
  cook_time: number;
  @Prop()
  method: [{ ['number']: string }];
  @Prop()
  servings: number;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  created_by: Types.ObjectId;
  @Prop()
  created_date: string;
  @Prop()
  status: string;
  @Prop({ type: { rating: Number, vote: Number } })
  rate: { rating: number; vote: number };
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
