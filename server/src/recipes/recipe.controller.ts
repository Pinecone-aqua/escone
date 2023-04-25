import { Controller, Get } from '@nestjs/common';
import { RecipeService } from './recipes.service';

@Controller('/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('all')
  getAllRecipes() {
    return this.recipeService.getAllRecipes();
  }
}
