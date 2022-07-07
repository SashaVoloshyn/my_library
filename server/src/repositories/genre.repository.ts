import { AppDataSource } from '../configs';
import { Genres } from '../entities';
import { IGenre } from '../interfaces';

class GenreRepository {
    genreRepository;

    constructor() {
        this.genreRepository = AppDataSource.getRepository(Genres);
    }

    public async createOne(genre: IGenre): Promise<Genres> {
        return this.genreRepository.save(genre);
    }

    public async getAll(): Promise<Genres[]> {
        return this.genreRepository.createQueryBuilder('genres')
            .leftJoinAndSelect('genres.authors', 'authors')
            .leftJoinAndSelect('genres.books', 'books')
            .getMany();
    }

    public async getOneById(id: number, limit: number): Promise<Genres | null> {
        return this.genreRepository.createQueryBuilder('genres')
            .leftJoinAndSelect('genres.books', 'books')
            .where('genres.id = :id', { id })
            .limit(limit)
            .getOne();
    }
}

export const genreRepository = new GenreRepository();
