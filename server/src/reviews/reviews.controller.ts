import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
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
  @Post('create')
  createReview(@Body() ReviewDto: ReviewDto) {
    const result = this.reviewService.createReview(ReviewDto);
    return result;
  }
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    const result = this.reviewService.deleteReview(id);
    return result;
  }
}
