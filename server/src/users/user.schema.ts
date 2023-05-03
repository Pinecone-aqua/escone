import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { ObjectId } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;
  @Prop()
  username: string;
  @Prop()
  image?: string;
  @Prop()
  email: string;
  @Prop()
  password?: string;
  @Prop()
  role: boolean;
  @Prop()
  favorites: string[];
  @Prop()
  created_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
