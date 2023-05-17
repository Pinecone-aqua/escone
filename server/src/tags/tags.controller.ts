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
import { CreateTagDto } from './dto/tags.create.dto';
import { TagService } from './tags.service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('all')
  getAllTags() {
    try {
      return this.tagService.getAllTags();
    } catch (error) {
      return error;
    }
  }
  @Post('add')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  createTag(@Body() tag: CreateTagDto) {
    try {
      const result = this.tagService.createTag(tag);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Put(':id')
  updateTag(@Body() tag: CreateTagDto, @Param('id') id: string) {
    try {
      const result = this.tagService.updateTag(id, tag);
      return result;
    } catch (error) {
      return error;
    }
  }
  @Delete(':id')
  @UseGuards(CheckRoleGuard)
  @CheckRole(true)
  deleteTag(@Param('id') id: string) {
    try {
      const result = this.tagService.deleteTag(id);
      return result;
    } catch (error) {
      return error;
    }
  }
}
