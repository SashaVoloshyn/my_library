import { AppDataSource } from '../configs';
import { Ratings } from '../entities';
import { IRating } from '../interfaces';

class RatingRepository {
    ratingRepository;

    constructor() {
        this.ratingRepository = AppDataSource.getRepository(Ratings);
    }

    public async createOne(rating: IRating): Promise<Ratings> {
        return this.ratingRepository.save(rating);
    }

    public async getOneByEmailOrNickName(): Promise<Ratings[] | null> {
        return this.ratingRepository.find();
    }
}

export const ratingRepository = new RatingRepository();
