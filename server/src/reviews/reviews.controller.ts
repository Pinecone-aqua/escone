import {
  Body,
  Controller,
  Delete,
  Get,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Headers,
  Param,
  Post,
  Query,
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
  getAllReview(@Query() query) {
    try {
      let page = 1;
      let orderBy;
      if (query.page) {
        page = query.page;
      }
      if (query.order_by) {
        if (query.type) {
          orderBy = { [query.order_by]: Number(query.type) };
        }
      }

      const result = this.reviewService.getAllReview(page, orderBy);
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
      console.log(ReviewDto);
      const result = this.reviewService.createReview(ReviewDto);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  async deleteReview(@Param('id') id: string, @Headers() Headers: any) {
    try {
      const [g, token] = Headers.authorization?.split(' ') ?? [];
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
