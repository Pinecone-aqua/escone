import {
  Body,
  Controller,
  Delete,
  Get,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CheckRole } from 'src/role/role.decorator';
import { CheckRoleGuard } from 'src/role/role.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './reviews.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('all')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  getAllReview() {
    try {
      const result = this.reviewService.getAllReview();
      return result;
    } catch (error) {
      return error;
    }
  }
  @Get(':id')
  getReview(@Param('id') id: string) {
    try {
      const result = this.reviewService.getReview(id);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Get('recipe/:id')
  getRecipeReview(@Param('id') id: string) {
    try {
      const result = this.reviewService.getRecipeReview(id);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Post('create')
  createReview(@Body() ReviewDto: ReviewDto) {
    try {
      const result = this.reviewService.createReview(ReviewDto);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async deleteReview(@Param('id') id: string, @Headers() Headers: any) {
    try {
      const [, token] = Headers.authorization?.split(' ') ?? [];
      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }
      const review: any = await this.reviewService.getReview(id);
      if (decodedToken.role == true || decodedToken._id == review.created_by) {
        const result = this.reviewService.deleteReview(id);
        return result;
      } else {
        return 'you have not permission';
      }
    } catch (error) {
      return error;
    }
  }
}
