import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Category } from './categories.schema';
import { CategoryDto } from './dto/categories.create.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  async getAllCategories() {
    const result = await this.categoryModel.find({});
    return result;
  }
  async getCategory(id: string) {
    const result = await this.categoryModel.find({ _id: id });
    return result;
  }
  async deleteCategory(id: string) {
    const result = await this.categoryModel.deleteOne({ _id: id });
    return result;
  }
  async createCategory(newCategory: CategoryDto) {
    const result = await this.categoryModel.insertMany({ newCategory });
    return result;
  }
  async updateCategory(id: string, CategoryData: any) {
    const result = await this.categoryModel.updateOne(
      { _id: id },
      CategoryData,
    );
    return result;
  }
}
