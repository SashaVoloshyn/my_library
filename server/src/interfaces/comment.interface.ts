export interface IComment {
    userId: number;
    bookId: number;
    text: string;
}

export interface ICommentCreate {
    clientKey: string,
    bookId: number,
    text: string,
}

export interface ICommentRequest {
    bookId: number,
    text: string,
}

export interface ICommentLikes {
    userId: number,
    like: number,
    disLike: number,
}

export interface ICommentLikesCreate extends ICommentLikes{
    clientKey: string,
    commentId: number,
}
