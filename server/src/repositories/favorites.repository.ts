import { AppDataSource } from '../configs';
import { IFavorite } from '../interfaces';
import { Favorites } from '../entities';

class FavoritesRepository {
    favoritesRepository;

    constructor() {
        this.favoritesRepository = AppDataSource.getRepository(Favorites);
    }

    public async createOne(favorite: IFavorite): Promise<Favorites> {
        return this.favoritesRepository.save(favorite);
    }

    public async getOneByEmailOrNickName(): Promise<Favorites[] | null> {
        return this.favoritesRepository.find();
    }
}

export const favoritesRepository = new FavoritesRepository();
