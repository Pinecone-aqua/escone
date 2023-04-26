import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { RecipeDto } from './dto/recipe.dto';

@Controller('/recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post('add')
  addRecipe(@Body() recipeDto: RecipeDto, @Req() req: any) {
    const created_by = req.user.username;
    return this.recipeService.addRecipe(recipeDto, created_by);
  }

  @Get('all')
  getRecipes() {
    return this.recipeService.getRecipes();
  }

  @Get('pending')
  getPendingRecipes() {
    return this.recipeService.getPendingRecipes();
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
