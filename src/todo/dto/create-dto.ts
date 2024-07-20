import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty()
  @IsString()
  title!: string; 

  @ApiProperty()
  @IsString()
  description!: string; 

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  status?: boolean;
}
