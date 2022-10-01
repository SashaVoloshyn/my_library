export interface IBook {
    name: string,
    description: string,
    fileText?: string,
    cover?: string,
    yearOfRelease?: number,
    fileAudio?: string,
    authorId: number,
    genres: number[] | number
}

export interface IBookCreate {
    book: IBook,
    genresId: number | number[],
}

export interface IBookNewFields {
    cover?: string,
    fileAudio?: string,
    yearOfRelease?: number,
    genres?: number[] | number,
    fileText?: string,
}

export interface IBookPatch {
    id: number,
    newFields: IBookNewFields
}
