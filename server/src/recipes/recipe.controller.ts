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
        const deletedUrl = recipe.images.filter(
          (element) => !req.images.includes(element),
        );
        console.log(deletedUrl.length != 0);
        if (deletedUrl.length != 0) {
          await this.recipeService.deleteImages(deletedUrl);
        }
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
      return error;
    }
  }

  @Put('status/:id')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  recipeStatus(@Param('id') id: string, @Body('status') status: string) {
    try {
      return this.recipeService.recipeStatus(id, status);
    } catch (error) {
      return error;
    }
  }

  @Get('statistics')
  getStatistics() {
    try {
      return this.recipeService.getStatistics();
    } catch (error) {
      return error;
    }
  }
  @Get('ids')
  getRecipesIds() {
    try {
      return this.recipeService.getRecipesIds();
    } catch (error) {
      return error;
    }
  }
  @Get('recipes')
  async getRecipes(@Query() query: any) {
    try {
      let optionQuery: any = { $and: [] };
      let limit = 12;
      let page = 1;
      let order_by = {};
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
        optionQuery.$and.push({
          'ingredients.name': { $all: ingredientNames },
        });
      }
      if (query.user) {
        const userId = new ObjectId(query.user);
        optionQuery.$and.push({ created_by: userId });
      }

      if (query.favorites) {
        const userfavorites = await this.userService.getUser(query.favorites);
        const favoriteIds = userfavorites.favorites.map(
          (Id: string) => new ObjectId(Id),
        );
        optionQuery.$and.push({ _id: { $in: favoriteIds } });
      }
      if (query.search) {
        const searchQuery = {
          $or: [
            { title: { $regex: query.search, $options: 'i' } },
            { description: { $regex: query.search, $options: 'i' } },
          ],
        };
        optionQuery.$and.push(searchQuery);
      }
      if (query.page) {
        page = query.page;
      }
      if (query.order_by) {
        if (query.type) {
          order_by = { [query.order_by]: Number(query.type) };
        }
      }
      if (
        Object.keys(query).filter((key) => {
          if (key == 'page') return;
          if (key == 'limit') return;
          if (key == 'order_by') return;
          if (key == 'type') return;
          if (key == 'id') return;
          return key;
        }).length == 0
      ) {
        optionQuery = {};
      }
      if (query.limit) {
        limit = query.limit;
      }
      const result = await this.recipeService.getRecipes(
        optionQuery,
        limit,
        page,
        order_by,
      );
      return result;
    } catch (error) {
      return error;
    }
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    try {
      return this.recipeService.getRecipe(id);
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string, @Headers() Headers) {
    try {
      const [, token] = Headers.authorization?.split(' ') ?? [];

      if (!token) {
        return 'have not token';
      }
      const decodedToken: any = this.jwtService.decode(token);
      if (!decodedToken) {
        return 'token extist';
      }
      const recipe: any = await this.recipeService.getRecipe(id);
      if (decodedToken.role == true || decodedToken._id == recipe.created_by) {
        return this.recipeService.deleteRecipe(id, recipe);
      } else {
        return 'you have not permission';
      }
    } catch (error) {
      return error;
    }
  }
}
