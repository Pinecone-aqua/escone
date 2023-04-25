import { Controller, Get } from '@nestjs/common';
import { TagService } from './tags.service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('all')
  getAllTags() {
    return this.tagService.getAllTags();
  }
}
