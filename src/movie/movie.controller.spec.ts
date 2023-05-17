import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

describe('MovieController', () => {
    let movieController: MovieController;
    let movieService: MovieService;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [
                {
                    provide: MovieService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        movieController = moduleRef.get<MovieController>(MovieController);
        movieService = moduleRef.get<MovieService>(MovieService);
    });

    describe('create', () => {
        it('should create a movie', async () => {
            const createMovieDto: MovieDto = {
                title: 'Example Movie',
                releaseDate: new Date('2023-05-17'),
            };

            const expectedMovie = {
                id: 1, ...createMovieDto, ratings: [],
                users: [],
            };

            const mockReq = { user: { id: 1 } }; 

            jest
                .spyOn(movieService, 'create')
                .mockResolvedValue(expectedMovie);

            const result = await movieController.create(mockReq, createMovieDto);

            expect(result).toEqual(expectedMovie);
        });
    });


    describe('findAll', () => {
        it('should return an array of movies', async () => {
            const expectedMovies: MovieEntity[] = [
                { id: 1, title: 'Movie 1', releaseDate: new Date(), ratings: [], users: [] },
                { id: 2, title: 'Movie 2', releaseDate: new Date(), ratings: [], users: [] },
            ];

            jest
                .spyOn(movieService, 'findAll')
                .mockResolvedValue(expectedMovies);

            const result = await movieController.findAll();

            expect(result).toEqual(expectedMovies);
        });
    });

    describe('findOne', () => {
        it('should return a movie by id', async () => {
            const movieId = '1';
            const expectedMovie: MovieEntity = {
                id: 1,
                title: 'Example Movie',
                releaseDate: new Date('2023-05-17'),
                ratings: [],
                users: [],
            };

            jest
                .spyOn(movieService, 'findOne')
                .mockResolvedValue(expectedMovie);

            const result = await movieController.findOne(movieId);

            expect(result).toEqual(expectedMovie);
        });
    });

    describe('update', () => {
        it('should update a movie', async () => {
            const movieId = '1';
            const updateMovieDto: UpdateMovieDto = {
                title: 'Updated Movie',
                releaseDate: new Date('2023-05-18'),
            };

            const expectedMovie: MovieEntity = {
                id: 1,
                title: 'Updated Movie',
                releaseDate: new Date('2023-05-18'),
                ratings: [],
                users: [],
            };

            jest
                .spyOn(movieService, 'update')
                .mockResolvedValue(expectedMovie);

            const result = await movieController.update(movieId, updateMovieDto);

            expect(result).toEqual(expectedMovie);
        });
    });


    describe('remove', () => {
        it('should remove a movie', async () => {
            const movieId = '1';

            jest.spyOn(movieService, 'remove').mockImplementation();

            const result = await movieController.remove(movieId);

            expect(result).toEqual('Deleted successfully!');
        });
    });
});
