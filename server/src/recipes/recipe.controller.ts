import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('add')
  createRecipe(@Body() RecipeDto: RecipeDto) {
    return this.recipeService.addRecipe(RecipeDto);
  }

  @Get('all')
  getAllRecipes() {
    return this.recipeService.getRecipes();
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
