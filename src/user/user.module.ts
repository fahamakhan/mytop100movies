import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { RatingEntity } from 'src/movie/entities/rating.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MovieEntity, RatingEntity])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
