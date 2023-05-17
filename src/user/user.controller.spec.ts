import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MovieEntity } from 'src/movie/entities/movie.entity';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserMovieSelections: jest.fn(),
            addMovieToUser: jest.fn(),
            removeMovieFromUser: jest.fn(),
            rankMoviesForUser: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('getUserMovieSelections', () => {
    it('should return user movie selections', async () => {
      const mockReq = { user: { id: 1 } }; // Mock req.user object
      const expectedMovies: MovieEntity[] = [
        { id: 1, title: 'Movie 1', releaseDate: new Date(), ratings: [], users: [] },
        { id: 2, title: 'Movie 2', releaseDate: new Date(), ratings: [], users: [] },
      ];
      
      jest
        .spyOn(usersService, 'getUserMovieSelections')
        .mockImplementation(async () => expectedMovies);

      const result = await usersController.getUserMovieSelections(mockReq);

      expect(result).toEqual(expectedMovies);
    });
  });

  describe('addMovieToUser', () => {
    it('should add a movie to the user', async () => {
      const mockReq = { user: { id: 1 } }; // Mock req.user object
      const movieId = 1;

      jest.spyOn(usersService, 'addMovieToUser').mockImplementation();

      await usersController.addMovieToUser(mockReq, movieId);

      expect(usersService.addMovieToUser).toHaveBeenCalledWith(mockReq.user.id, movieId);
    });
  });

  describe('removeMovieFromUser', () => {
    it('should remove a movie from the user', async () => {
      const mockReq = { user: { id: 1 } }; // Mock req.user object
      const movieId = 1;

      jest.spyOn(usersService, 'removeMovieFromUser').mockImplementation();

      await usersController.removeMovieFromUser(mockReq, movieId);

      expect(usersService.removeMovieFromUser).toHaveBeenCalledWith(mockReq.user.id, movieId);
    });
  });

  describe('rankMoviesForUser', () => {
    it('should rank movies for the user', async () => {
      const mockReq = { user: { id: 1 } }; // Mock req.user object
      const movieRanks = { movieId: 1, rank: 5 };

      jest.spyOn(usersService, 'rankMoviesForUser').mockImplementation();

      const result = await usersController.rankMoviesForUser(mockReq, movieRanks);

      expect(usersService.rankMoviesForUser).toHaveBeenCalledWith(mockReq.user.id, movieRanks);
      expect(result).toBe('success');
    });
  });

});
