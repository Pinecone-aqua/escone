import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  // @Post('add')
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  // async addRecipe(
  //   @Body() recipeDto: RecipeDto,
  //   @UploadedFile(new ParseFilePipe()) files: { image?: Express.Multer.File[] },
  // ) {
  //   try {
  //     const image = files.image?.[0];
  //     const imageUrl = image
  //       ? await this.recipeService.uploadImageToCloudinary(image)
  //       : null;

  //     const recipeData = { ...recipeDto, image_url: imageUrl };
  //     return this.recipeService.addRecipe(recipeData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image' }]))
  async addRecipe(
    @Body()
    body: {
      recipeDto: RecipeDto;
      name: string;
    },
    @UploadedFile() files: { image?: Express.Multer.File[] },
  ) {
    try {
      const response = await this.cloudinary.uploadImage(files.image[0]);

      const data = {
        ...body.recipeDto,
        image_url: response.secure_url,
        name: body.name,
      };

      return this.recipeService.addRecipe(data);
    } catch (error) {
      console.log(error);
    }
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
  @Put('approve')
  recipeApprove(@Body('id') id: string) {
    return this.recipeService.recipeApprove(id);
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
