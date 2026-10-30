import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateWorldNoteDto } from './dto/create-world-note.dto.js';

@Injectable()
export class WorldNotesService {
  constructor(private readonly prisma: PrismaService) {}

  findApproved() {
    return this.prisma.worldNote.findMany({
      where: { approved: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAllAdmin() {
    return this.prisma.worldNote.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  create(dto: CreateWorldNoteDto) {
    return this.prisma.worldNote.create({
      data: {
        ...dto,
        color: dto.color ?? '#4AF2C8',
        approved: false,
      },
    });
  }

  async approve(id: string) {
    const note = await this.prisma.worldNote.findUnique({ where: { id } });
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    return this.prisma.worldNote.update({
      where: { id },
      data: { approved: true },
    });
  }

  async remove(id: string) {
    const note = await this.prisma.worldNote.findUnique({ where: { id } });
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    return this.prisma.worldNote.delete({ where: { id } });
  }
}
