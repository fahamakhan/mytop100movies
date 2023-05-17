import { PartialType } from '@nestjs/swagger';
import { MovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(MovieDto) {}
