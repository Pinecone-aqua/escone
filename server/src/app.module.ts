import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { tagsModule } from './tags/tags.module';
import { userModule } from './users/users.module';
import { recipeModule } from './recipes/recipes.module';

@Module({
  imports: [
    userModule,
    MongooseModule.forRoot(
      'mongodb+srv://escone:H4YbL4MhTZWA7WvJ@pineapple-cluster.a1sr54g.mongodb.net/escone?retryWrites=true&w=majority',
    ),
    tagsModule,
    recipeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
