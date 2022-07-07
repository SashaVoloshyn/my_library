import { AppDataSource } from '../configs';
import { Books } from '../entities';
import { IBook } from '../interfaces';

class BookRepository {
    bookRepository;

    constructor() {
        this.bookRepository = AppDataSource.getRepository(Books);
    }

    public async createOne(book: IBook): Promise<Books> {
        const id = [] as any;
        book.genres.forEach((genre) => id.push({ id: genre }));
        return this.bookRepository.save({ ...book, genres: id });
    }

    public async getOneByEmailOrNickName(): Promise<Books[] | null> {
        return this.bookRepository.find();
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
}

export const bookRepository = new BookRepository();
