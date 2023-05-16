import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryDto } from './dto/categories.create.dto';

@Controller('category')
export class CategoryContoller {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    try {
      const result = this.categoryService.getAllCategories();
      return result;
    } catch (error) {
      return error;
    }
  }
  @Get(':id')
  getCategory(@Param('id') id: string) {
    try {
      const result = this.categoryService.getCategory(id);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Post('add')
  createCategory(@Body() categoryDto: CategoryDto) {
    try {
      const result = this.categoryService.createCategory(categoryDto);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Put(':id')
  updateCategory(@Body() categoryDto: CategoryDto, @Param('id') id: string) {
    try {
      const result = this.categoryService.updateCategory(id, categoryDto);
      return result;
    } catch (error) {
      return error;
    }
  }
}
