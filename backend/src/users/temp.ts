import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id: string;
  username: string;
  image: string;
  email: string;
  password: string;
  role: boolean;
  favorites: string[];
  created_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
