import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(includeUnpublished = false) {
    return this.prisma.project.findMany({
      where: includeUnpublished ? undefined : { published: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findBySlug(slug: string, includeUnpublished = false) {
    const project = await this.prisma.project.findFirst({
      where: {
        slug,
        ...(includeUnpublished ? {} : { published: true }),
      },
    });
    if (!project) throw new NotFoundException(`Project ${slug} not found`);
    return project;
  }

  create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...dto,
        sceneConfig: dto.sceneConfig as Prisma.InputJsonValue,
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    await this.ensureExists(id);
    const { sceneConfig, ...rest } = dto;
    return this.prisma.project.update({
      where: { id },
      data: {
        ...rest,
        ...(sceneConfig !== undefined
          ? { sceneConfig: sceneConfig as Prisma.InputJsonValue }
          : {}),
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    return this.prisma.project.delete({ where: { id } });
  }

  private async ensureExists(id: string) {
    const found = await this.prisma.project.findUnique({ where: { id } });
    if (!found) throw new NotFoundException(`Project ${id} not found`);
  }
}
