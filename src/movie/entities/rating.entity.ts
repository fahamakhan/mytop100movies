import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('ratings')
export class RatingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  rating: number;

  @ManyToOne(() => MovieEntity, movie => movie.ratings)
  movie: MovieEntity;

  @ManyToOne(() => UserEntity, user => user.ratings)
  user: UserEntity;
}
