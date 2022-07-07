import { AppDataSource } from '../configs';
import { Comments } from '../entities';
import { IComment } from '../interfaces';

class CommentRepository {
    commentRepository;

    constructor() {
        this.commentRepository = AppDataSource.getRepository(Comments);
    }

    public async createOne(comment: IComment): Promise<Comments> {
        return this.commentRepository.save(comment);
    }

    public async getOneByEmailOrNickName(): Promise<Comments[] | null> {
        return this.commentRepository.find();
    }
}

export const commentRepository = new CommentRepository();
