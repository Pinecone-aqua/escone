import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private ReviewModel: Model<Review>) {}

  async getAllReview() {
    try {
      const result = await this.ReviewModel.find({});
      return result;
    } catch (error) {
      return error;
    }
  }

  async getReview(id: string) {
    try {
      const result = await this.ReviewModel.find({ _id: id }).populate({
        path: 'created_by',
        select: { _id: 1, username: 1, image: 1 },
      });
      return result;
    } catch (error) {
      return error;
    }
  }
  async getRecipeReview(id: string) {
    try {
      const result = await this.ReviewModel.find({ recipe_id: id }).populate({
        path: 'created_by',
        select: { username: 1, image: 1 },
      });
      return result;
    } catch (error) {
      return error;
    }
  }

  async createReview(newReview) {
    try {
      const result = await this.ReviewModel.insertMany(newReview);
      return result;
    } catch (error) {
      return error;
    }
  }
  async deleteReview(id: string) {
    try {
      const result = await this.ReviewModel.deleteOne({ _id: id });
      return result;
    } catch (error) {
      return error;
    }
  }
}
