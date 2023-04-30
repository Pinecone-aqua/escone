import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop()
  _id: string;
  @Prop()
  name: string;
  @Prop()
  picture: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
