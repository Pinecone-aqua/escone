import { Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { IngredientService } from './ingredients.service';

@Controller('/ingredient')
export class IngredientController {
  constructor(private readonly IngrediendService: IngredientService) {}
  @Get('all')
  getAllIngredient() {
    return this.IngrediendService.getAllIngredient();
  }
  @Delete(':id')
  deleteIngredient(@Param('id') id: string) {
    return this.IngrediendService.deleteIngredient(id);
  }
}
