import { DeleteResult, UpdateResult } from 'typeorm';

import { AppDataSource } from '../configs';
import { Books } from '../entities';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: Books): Promise<Books> {
        return this.bookRepository.save(book);
    }

    public async updateOne(id: number, updateFields: Partial<Books>): Promise<Books | UpdateResult> {
        return this.bookRepository.update({ id }, { ...updateFields });
    }

    public async getAll(): Promise<Books[]> {
        return this.bookRepository.createQueryBuilder('books')
            .leftJoinAndSelect('books.genres', 'genres')
            .leftJoinAndSelect('books.alreadyRead', 'alreadyRead')
            .leftJoinAndSelect('books.willRead', 'willRead')
            .leftJoinAndSelect('books.favorites', 'favorites')
            .leftJoinAndSelect('books.comments', 'comments')
            .leftJoinAndSelect('books.author', 'author')
            .leftJoinAndSelect('books.ratings', 'ratings')
            .getMany();
    }

    public async getOneById(id: number): Promise<Books | null> {
        return this.bookRepository.findOne({
            where: { id },
            relations: {
                genres: true,
                comments: true,
                ratings: true,
                author: true,
            },
        });
    }

    public async getOneByDescription(description: string): Promise<Books | null> {
        return this.bookRepository.findOneBy({ description });
    }

    public async deleteOne(id: number): Promise<DeleteResult> {
        return this.bookRepository.delete({ id });
    }
}

export const bookRepository = new BookRepository();
