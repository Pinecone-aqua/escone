import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { categoryModel } from './categories/categories.module';
import { recipeModule } from './recipes/recipes.module';
import { reviewModule } from './reviews/reviews.module';
import { tagsModule } from './tags/tags.module';
import { userModule } from './users/users.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { RequestLoggerMiddleware } from './requestLogger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://escone:H4YbL4MhTZWA7WvJ@pineapple-cluster.a1sr54g.mongodb.net/escone?retryWrites=true&w=majority',
    ),
    userModule,
    tagsModule,
    recipeModule,
    categoryModel,
    reviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
