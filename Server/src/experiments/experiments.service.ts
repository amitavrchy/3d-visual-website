import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ExperimentsService {
  constructor(private readonly prisma: PrismaService) {}

  findPublished() {
    return this.prisma.experiment.findMany({
      where: { published: true },
      orderBy: { title: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    const experiment = await this.prisma.experiment.findFirst({
      where: { slug, published: true },
    });
    if (!experiment) {
      throw new NotFoundException(`Experiment ${slug} not found`);
    }
    return experiment;
  }
}
