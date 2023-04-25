import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tag {
  _id: string;
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
