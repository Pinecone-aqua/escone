import {
  Body,
  Controller,
  Delete,
  Get,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { CheckRoleGuard } from 'src/role/role.guard';
import { CheckRole } from 'src/role/role.decorator';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/users/users.service';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async createRecipe(
    @Body() body: { body: string },
    @UploadedFiles()
    files?: {
      images?: Express.Multer.File[];
    },
  ) {
    const req: RecipeDto = JSON.parse(body.body);
    req.status = 'pending';
    if (files?.images) {
      const url = await this.recipeService.uploadImageToCloudinary(
        files.images,
      );
      req.images.push(...url);
    }
    return this.recipeService.createRecipe(req);
  }

  @Patch('upload/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async uploadImage(
    @Param('id') id: string,
    @Body() body: { body: string },
    @Headers() Headers: any,
    @UploadedFiles()
    files?: {
      images?: Express.Multer.File[];
    },
  ) {
    try {
      const [type, token] = Headers.authorization?.split(' ') ?? [];
      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }
      const recipe: any = await this.recipeService.getRecipe(id);
      const req: RecipeDto = JSON.parse(body.body);
      if (decodedToken.role == true || decodedToken._id == recipe.created_by) {
        if (files?.images) {
          const url = await this.recipeService.uploadImageToCloudinary(
            files.images,
          );
          req.images.push(...url);
        }

        return this.recipeService.editRecipe(id, req);
      } else {
        return 'you have not permission';
      }
    } catch (error) {
      return { error };
    }
  }

  @Put('status/:id')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  recipeStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.recipeService.recipeStatus(id, status);
  }

  @Get('statistics')
  getStatistics() {
    return this.recipeService.getStatistics();
  }

  @Get('recipes')
  async getRecipes(@Query() query: any) {
    let optionQuery: any = { $and: [] };

    if (query.status) {
      optionQuery.$and.push({ status: query.status });
    }
    if (query.category) {
      const categoryIds = Array.isArray(query.category)
        ? query.category.map((categoryId: string) => new ObjectId(categoryId))
        : [new ObjectId(query.category)];

      optionQuery.$and.push({ categories: { $all: categoryIds } });
    }
    if (query.tag) {
      const tagIds = Array.isArray(query.tag)
        ? query.tag.map((tagId: string) => new ObjectId(tagId))
        : [new ObjectId(query.tag)];

      optionQuery.$and.push({ tags: { $all: tagIds } });
    }
    if (query.ingredient) {
      const ingredientNames = Array.isArray(query.ingredient)
        ? query.ingredient.map((ingredient: string) => ingredient)
        : [query.ingredient];
      console.log(ingredientNames, 'this is worked');
      optionQuery.$and.push({ ingredients: { $all: ingredientNames } });
    }
    if (query.user) {
      const userId = new ObjectId(query.user);
      optionQuery.$and.push({ created_by: userId });
    }
    if (query.favorites) {
      const userfavorites = await this.userService.getUser(query.favorites);
      console.log(userfavorites);
      const favoriteIds = userfavorites.favorites.map(
        (Id: string) => new ObjectId(Id),
      );

      optionQuery.$and.push({ _id: { $in: favoriteIds } });
    }
    if (Object.keys(query).length == 0) {
      optionQuery = {};
    }
    console.log(query);
    console.log(optionQuery);

    return this.recipeService.getRecipes(optionQuery);
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string, @Headers() Headers) {
    try {
      const [type, token] = Headers.authorization?.split(' ') ?? [];

      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }
      const recipe: any = await this.recipeService.getRecipe(id);
      if (decodedToken.role == true || decodedToken._id == recipe.created_by) {
        return this.recipeService.deleteRecipe(id);
      } else {
        return 'you have not permission';
      }
    } catch (error) {
      return error;
    }
  }
}
