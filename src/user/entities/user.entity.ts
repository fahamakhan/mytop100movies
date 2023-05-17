import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { MovieEntity } from '../../movie/entities/movie.entity';
import { RatingEntity } from '../../movie/entities/rating.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @ManyToMany(() => MovieEntity, movie => movie.users)
  @JoinTable()
  movies: MovieEntity[];

  @OneToMany(() => RatingEntity, rating => rating.user)
  ratings: RatingEntity[];
}
