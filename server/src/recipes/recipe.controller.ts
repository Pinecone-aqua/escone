import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('add')
  addRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeService.addRecipe(recipeDto);
  }

  @Patch('upload/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images' }]))
  async uploadImage(
    @Param('id') id: string,
    @Body() body: { body: string },
    @UploadedFiles()
    files?: {
      images?: Express.Multer.File[];
    },
  ) {
    const req: RecipeDto = JSON.parse(body.body);
    console.log(req);
    if (files?.images) {
      const url = await this.recipeService.uploadImageToCloudinary(
        files.images,
      );
      req.images.push(...url);
      console.log(url, req, id);
    }

    return this.recipeService.editRecipe(id, req);
  }
  @Put('approve')
  recipeApprove(@Body('id') id: string) {
    return this.recipeService.recipeApprove(id);
  }
  @Put('deny')
  recipeDeny(@Body('id') id: string) {
    console.log(id);
    return this.recipeService.recipeDeny(id);
  }
  @Get('user/:id')
  getUserRecipe(@Param('id') id: string) {
    const result = this.recipeService.getUserRecipe(id);
    return result;
  }
  @Get('status')
  getStatus() {
    console.log('this');
    return this.recipeService.getStatus();
  }

  @Get('all')
  getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get('pending')
  getPendingRecipes() {
    return this.recipeService.getPendingRecipes();
  }
  @Get('filter')
  getFilterRecipes(@Query() filter: any) {
    return this.recipeService.getFilterRecipe(filter);
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }

  @Put(':id')
  editRecipe(@Param('id') id: string, @Body() recipeDto: RecipeDto) {
    return this.recipeService.editRecipe(id, recipeDto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string) {
    return this.recipeService.deleteRecipe(id);
  }
}
