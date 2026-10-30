import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { CreateWorldNoteDto } from './dto/create-world-note.dto.js';
import { WorldNotesService } from './world-notes.service.js';

@Controller('world-notes')
export class WorldNotesController {
  constructor(private readonly notes: WorldNotesService) {}

  @Get()
  findApproved() {
    return this.notes.findApproved();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/all')
  findAllAdmin() {
    return this.notes.findAllAdmin();
  }

  @Post()
  create(@Body() dto: CreateWorldNoteDto) {
    return this.notes.create(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id/approve')
  approve(@Param('id') id: string) {
    return this.notes.approve(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notes.remove(id);
  }
}
