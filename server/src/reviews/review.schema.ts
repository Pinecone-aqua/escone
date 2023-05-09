import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';
import { User } from 'src/users/user.schema';

@Schema()
export class Review {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  recipe_id: ObjectId;
  @Prop()
  rate: number;
  @Prop()
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  created_by: ObjectId;
  @Prop()
  created_date: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
