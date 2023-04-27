import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryContoller } from './categories.controller';
import { Category, CategorySchema } from './categories.schema';
import { CategoryService } from './categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryContoller],
  providers: [CategoryService],
})
export class categoryModel {}
