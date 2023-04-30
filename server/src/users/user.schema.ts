import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  _id: string;
  @Prop()
  username: string;
  @Prop()
  image: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  role: boolean;
  @Prop()
  favorites: string[];
  @Prop()
  created_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
