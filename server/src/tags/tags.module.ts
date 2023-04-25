import { Module } from '@nestjs/common';
import { TagController } from './tags.controller';
import { TagService } from './tags.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './tags.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagsModule {}
