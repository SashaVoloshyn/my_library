import { UpdateResult } from 'typeorm';

import { genresRelationsService } from './genresRelations.service';
import { authorRepository } from '../repositories';
import { Authors } from '../entities';
import { IAuthorCreate, IAuthorPatch } from '../interfaces';

class AuthorService {
    public async createWithRelationsByGenres({ author, genresId }: IAuthorCreate): Promise<Authors> {
        const newAuthor = new Authors();

        if (author?.dateDeath) newAuthor.dateDeath = author.dateDeath;
        if (author?.pseudonym) newAuthor.pseudonym = author.pseudonym;
        if (author?.photo) newAuthor.photo = author.photo;
        if (author?.biography) newAuthor.biography = author.biography;
        if (author?.country) newAuthor.country = author.country;
        if (author?.dateBirthday) newAuthor.dateBirthday = author.dateBirthday;
        if (author?.firstName) newAuthor.firstName = author.firstName;
        if (author?.lastName) newAuthor.lastName = author.lastName;

        const genres = genresRelationsService(genresId);

        if (genres) newAuthor.genres = genres;

        return authorRepository.createOne(newAuthor);
    }

    public async patchingFields({ id, newFields }: IAuthorPatch): Promise<Authors | UpdateResult | undefined> {
        const authorsForPatching = new Authors();

        if (newFields?.dateDeath) authorsForPatching.dateDeath = newFields.dateDeath;
        if (newFields?.pseudonym) authorsForPatching.pseudonym = newFields.pseudonym;
        if (newFields?.photo) authorsForPatching.photo = newFields.photo;
        if (newFields?.biography) authorsForPatching.biography = newFields.biography;

        if (newFields.genres) {
            const genres = genresRelationsService(newFields.genres);

            if (genres) authorsForPatching.genres = genres;

            return authorRepository.updateOne(id, { ...authorsForPatching });
        }

        return authorRepository.updateOne(id, { ...authorsForPatching });
    }

    public async getAllWithPagination(page = 1, perPage = 30): Promise<[Authors[], number]> {
        const skip = perPage * (page - 1);
        return authorRepository.getAllWithPagination(skip, perPage);
    }

    public async getOneByPseudonym(pseudonym: string | undefined): Promise<Authors | null> {
        if (pseudonym) {
            return authorRepository.getOneByPseudonym(pseudonym);
        }
        return null;
    }
}

export const authorService = new AuthorService();
