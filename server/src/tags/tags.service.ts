import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './tags.schema';
import { CreateTagDto } from './dto/tags.create.dto';
@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}
  async getAllTags() {
    try {
      const result = await this.tagModel.find({});
      return result;
    } catch (error) {
      return error;
    }
  }

  async deleteTag(id: string) {
    try {
      const result = await this.tagModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      return error;
    }
  }
  async createTag(newCategory: CreateTagDto) {
    try {
      const result = await this.tagModel.create({ ...newCategory });
      return result;
    } catch (error) {
      return error;
    }
  }
  async updateTag(id: string, CategoryData: any) {
    try {
      const result = await this.tagModel.updateOne({ _id: id }, CategoryData);
      return result;
    } catch (error) {
      return error;
    }
  }
}
