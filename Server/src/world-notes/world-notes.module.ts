import { Module } from '@nestjs/common';
import { WorldNotesController } from './world-notes.controller.js';
import { WorldNotesService } from './world-notes.service.js';

@Module({
  controllers: [WorldNotesController],
  providers: [WorldNotesService],
})
export class WorldNotesModule {}
