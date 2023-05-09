import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from './reviews.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('all')
  getAllReview() {
    const result = this.reviewService.getAllReview();
    return result;
  }
  @Get(':id')
  getReview(@Param('id') id: string) {
    const result = this.reviewService.getReview(id);
    return result;
  }
  @Get('recipe/:id')
  getRecipeReview(@Param('id') id: string) {
    const result = this.reviewService.getRecipeReview(id);
    return result;
  }
}
