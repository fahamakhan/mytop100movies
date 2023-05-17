import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,  IsDateString } from 'class-validator';


export class MovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsDateString()
  releaseDate: Date;

}

