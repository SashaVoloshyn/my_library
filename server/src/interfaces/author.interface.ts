export interface IAuthor {
    firstName: string,
    lastName: string,
    pseudonym?: string,
    dateBirthday: string,
    dateDeath?: string,
    country: string,
    biography: string,
    photo?: string,
    genres: number[];
}

export interface IAuthorCreate {
    author: IAuthor,
    genresId: number[] | number
}

export interface IAuthorNewFields {
    dateDeath?: string,
    photo?: string,
    pseudonym?: string,
    genres?: number[] | number,
    biography?: string,
}

export interface IAuthorPatch {
    id: number,
    newFields: IAuthorNewFields
}
