import { AppDataSource } from '../configs';
import { WillRead } from '../entities';
import { IWillRead } from '../interfaces';

class WillReadRepository {
    willReadRepository;

    constructor() {
        this.willReadRepository = AppDataSource.getRepository(WillRead);
    }

    public async createOne(willRead: IWillRead): Promise<WillRead> {
        return this.willReadRepository.save(willRead);
    }

    public async getOneByEmailOrNickName(): Promise<WillRead[] | null> {
        return this.willReadRepository.find();
    }
}

export const willReadRepository = new WillReadRepository();
