import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review } from './review.schema';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private ReviewModel: Model<Review>) {}

  async getAllReview() {
    const result = await this.ReviewModel.find({});
    return result;
  }

  async getReview(id: string) {
    const result = await this.ReviewModel.find({ _id: id }).populate({
      path: 'created_by',
      select: { username: 1, image: 1 },
    });
    return result;
  }
  async getRecipeReview(id: string) {
    const result = await this.ReviewModel.find({ recipe_id: id }).populate({
      path: 'created_by',
      select: { username: 1, image: 1 },
    });
    return result;
  }

  async createReview(newReview) {
    const result = await this.ReviewModel.insertMany(newReview);
    return result;
  }
  async deleteReview(id: string) {
    const result = await this.ReviewModel.deleteOne({ _id: id });
    return result;
  }
}
