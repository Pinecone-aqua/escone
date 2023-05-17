import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  // @Prop()
  // _id: string;
  @Prop()
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
