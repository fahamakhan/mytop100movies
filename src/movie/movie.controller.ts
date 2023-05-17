import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('movie')
@ApiTags('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) { }

  @Roles('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  create(@Req() req, @Body() createclassDto: MovieDto) {
    return this.movieService.create(req.user.id, createclassDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get('popular')
  findPopularMoviesFromTMDB(@Param('pageNumber') pageNumber: number,) {
    return this.movieService.findPopularMoviesFromTMDB(pageNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateclassDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateclassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.movieService.remove(+id);
    return 'Deleted successfully!'
  }
}
