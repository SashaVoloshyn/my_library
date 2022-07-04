import { IGenre } from './genre.interface';

export interface IBook {
    name: string,
    description: string,
    fileText: string,
    cover?: string,
    fileAudio?: string,
    authorId: number,
    genres: IGenre[]
}
