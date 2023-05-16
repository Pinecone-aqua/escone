import { Controller, Get } from '@nestjs/common';
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
}
