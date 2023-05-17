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
    try {
      const result = await this.categoryModel.find({}).limit(30);
      return result;
    } catch (error) {
      return error;
    }
  }
  async getCategory(id: string) {
    try {
      const result = await this.categoryModel.find({ _id: id });
      return result;
    } catch (error) {
      return error;
    }
  }
  async deleteCategory(id: string) {
    try {
      const result = await this.categoryModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      return error;
    }
  }
  async createCategory(newCategory: CategoryDto) {
    try {
      const result = await this.categoryModel.create({ ...newCategory });
      return result;
    } catch (error) {
      return error;
    }
  }
  async updateCategory(id: string, CategoryData: any) {
    try {
      const result = await this.categoryModel.updateOne(
        { _id: id },
        CategoryData,
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}
