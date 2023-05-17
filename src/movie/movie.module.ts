import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, UserEntity])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class MovieModule { }
