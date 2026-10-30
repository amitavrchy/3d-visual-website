import { Controller, Get, Param } from '@nestjs/common';
import { ExperimentsService } from './experiments.service.js';

@Controller('experiments')
export class ExperimentsController {
  constructor(private readonly experiments: ExperimentsService) {}

  @Get()
  findAll() {
    return this.experiments.findPublished();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.experiments.findBySlug(slug);
  }
}
