import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RatingEntity } from './rating.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @OneToMany(() => RatingEntity, rating => rating.movie)
  ratings: RatingEntity[];

  @ManyToMany(() => UserEntity, user => user.movies)
  @JoinTable()
  users: UserEntity[];
}
