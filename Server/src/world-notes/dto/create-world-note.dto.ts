import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateWorldNoteDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  author!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(280)
  message!: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsNumber()
  x!: number;

  @IsNumber()
  y!: number;

  @IsNumber()
  z!: number;
}
