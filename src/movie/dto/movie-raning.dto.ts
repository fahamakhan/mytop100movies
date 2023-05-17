import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class MovieRankDto {
    @ApiProperty({
      example: 1,
      description: 'The movie id',
    })
    @IsNumber()
    movieId: number;
  
    @ApiProperty({
      example: 5,
      description: 'The rank of movie',
    })
    @IsNumber()
    rank: number;
  }