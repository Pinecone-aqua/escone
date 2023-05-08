import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Tag {
  // @Prop()
  // _id: string;
  @Prop()
  name: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
