import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryDto } from './dto/categories.create.dto';

@Controller('category')
export class CategoryContoller {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  getAllCategories() {
    const result = this.categoryService.getAllCategories();
    return result;
  }
  @Get(':id')
  getCategory(@Param('id') id: string) {
    const result = this.categoryService.getCategory(id);
    return result;
  }
  @Post('add')
  createCategory(@Body() categoryDto: CategoryDto) {
    const result = this.categoryService.createCategory(categoryDto);
    return result;
  }
  @Put(':id')
  updateCategory(@Body() categoryDto: CategoryDto, @Param('id') id: string) {
    const result = this.categoryService.updateCategory(id, categoryDto);
    return result;
  }
}
