import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CheckRole } from 'src/role/role.decorator';
import { CheckRoleGuard } from 'src/role/role.guard';
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
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
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
  @Delete(':id')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  deleteCategory(@Param('id') id: string) {
    try {
      const result = this.categoryService.deleteCategory(id);
      return result;
    } catch (error) {
      return error;
    }
  }
}
