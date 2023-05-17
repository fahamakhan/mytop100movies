import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';
import axios from 'axios';
import { UserEntity } from '../user/entities/user.entity';


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  async create(userId: number, createMovieDto: MovieDto): Promise<MovieEntity> {
    let user = await this.userRepository.findOne({ where: { id: userId } })
    let movie = new MovieEntity()
    movie.title = createMovieDto.title
    movie.releaseDate = createMovieDto.releaseDate
    movie.users = [user]
    let movieSaved = await this.movieRepository.save(movie);
    delete movieSaved.users
    return movieSaved
  }

  async findPopularMoviesFromTMDB(pageNumber: number): Promise<any> {
    let apiKey = process.env.TMDB_APIKEY
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNumber}&api_key=${apiKey}`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie details');
    }
  }

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async findOne(id: number): Promise<MovieEntity> {
    return await this.movieRepository.findOne({ where: { id } });
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<MovieEntity> {
    await this.movieRepository.update(id, updateMovieDto);
    return await this.movieRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.movieRepository.softDelete(id);
  }
}
