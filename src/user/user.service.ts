import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MovieEntity } from '../movie/entities/movie.entity';
import { RatingEntity } from '../movie/entities/rating.entity';
import { MovieRankDto } from '../movie/dto/movie-raning.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    @InjectRepository(RatingEntity)
    private ratingRepository: Repository<RatingEntity>,
  ) { }

  async getUserMovieSelections(userId: number): Promise<MovieEntity[]> {
    const movies = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.ratings', 'rating')
      .where('rating.user = :userId', { userId })
      .orderBy('rating.rating', 'ASC')
      .getMany();

    return movies;
  }
  async addMovieToUser(userId: number, movieId: number): Promise<void> {
    const user = await this.getUserById(userId);
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    user.movies = [movie]
    await this.userRepository.save(user);
  }

  async removeMovieFromUser(userId: number, movieId: number): Promise<void> {
    const user = await this.getUserById(userId);
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    movie.users = movie.users.filter(u => u.id !== user.id);
    await this.movieRepository.save(movie);
  }

  async rankMoviesForUser(userId: number, movieRanks: MovieRankDto): Promise<void> {
    const user = await this.getUserById(userId);

    const { movieId, rank } = movieRanks
    const movie = await this.movieRepository.findOne({ where: { id: movieId } });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const rating = new RatingEntity();
    rating.rating = rank;
    rating.movie = movie;
    rating.user = user;

    await this.ratingRepository.save(rating);
  }


  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id
      }
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
