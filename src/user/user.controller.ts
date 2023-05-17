import { Controller, Get, Body, Patch, Param, Delete, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { MovieEntity } from '../movie/entities/movie.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles.decorator';
import { MovieRankDto } from '../movie/dto/movie-raning.dto';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  @Roles('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/movies')
  async getUserMovieSelections(@Req() req): Promise<MovieEntity[]> {
    return this.usersService.getUserMovieSelections(req.user.id);
  }

  @Roles('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/movies/:movieId')
  async addMovieToUser(
    @Req() req,
    @Param('movieId') movieId: number,
  ): Promise<void> {
    await this.usersService.addMovieToUser(req.user.id, movieId);
  }

  @Roles('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('/movies/:movieId')
  async removeMovieFromUser(
    @Req() req,
    @Param('movieId') movieId: number,
  ): Promise<void> {
    await this.usersService.removeMovieFromUser(req.user.id, movieId);
  }

  @Roles('user')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post('/ranking')
  async rankMoviesForUser(
    @Req() req,
    @Body() movieRanks: MovieRankDto,
  ): Promise<string> {
    await this.usersService.rankMoviesForUser(req.user.id, movieRanks);
    return 'success'
  }

}
