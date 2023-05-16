import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './review.schema';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class reviewModule {}
