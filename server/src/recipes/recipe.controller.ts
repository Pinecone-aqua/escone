import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('/recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('add')
  addRecipe(@Body() recipeDto: RecipeDto) {
    return this.recipeService.addRecipe(recipeDto);
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
