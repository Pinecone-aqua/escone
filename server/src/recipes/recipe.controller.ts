import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { AddRecipeDto } from './dto/recipe.add.dto';

@Controller('/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('all')
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }

  @Post('add')
  addRecipe(@Body() addRecipeDto: AddRecipeDto) {
    return this.recipeService.addRecipe(addRecipeDto);
  }

  @Delete(':id')
  deleteRecipe(@Param('id') id: string) {
    console.log('deleting recipe id: ', id);
    return this.recipeService.deleteRecipe(id);
  }

  @Get(':id')
  getRecipe(@Param('id') id: string) {
    return this.recipeService.getRecipe(id);
  }
}
