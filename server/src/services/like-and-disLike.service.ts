import { ClientEnum } from '../enums';
import { clientService } from './client.service';

class LikeAndDisLikeService {
    public async getAllByCommentId(commentId: string): Promise<string[]> {
        return clientService.getAnyKeysByNickName(commentId.toString(), ClientEnum.ACTIONS_LIKES);
    }

    public async getOneByCommentId(commentId: string): Promise<string | null> {
        return clientService.get(commentId);
    }
}

export const likeAndDisLikeService = new LikeAndDisLikeService();
