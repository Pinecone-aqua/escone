import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import * as ingredientsCreateDto from './dto/ingredients.create.dto';
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
  @Put(':id')
  updateIngredient(
    @Param('id') id: string,
    @Body() CreateIngredientDto: ingredientsCreateDto.CreateIngredientDto,
  ) {
    return this.IngrediendService.updateIngredient(id, CreateIngredientDto);
  }
  @Post('add')
  createIngredient(
    @Body() CreateIngredientDto: ingredientsCreateDto.CreateIngredientDto,
  ) {
    return this.IngrediendService.createIngredient(CreateIngredientDto);
  }
}
