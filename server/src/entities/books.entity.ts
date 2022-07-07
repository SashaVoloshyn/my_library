import {
    Column, Entity, OneToMany, JoinColumn, ManyToOne, ManyToMany,
} from 'typeorm';

import { AlreadyRead } from './already-read.entity';
import { Authors } from './authors.entity';
import { CommonsFields } from './commons-fields.entity';
import { Comments } from './comments.entity';
import { Genres } from './genres.entity';
import { Favorites } from './favorites.entity';
import { Ratings } from './ratings.entity';
import { WillRead } from './will-read.entity';

@Entity()
export class Books extends CommonsFields {
    @Column({
        name: 'name',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        name: string;

    @Column({
        name: 'description',
        type: 'varchar',
        width: 2000,
        nullable: false,
        unique: true,
    })
        description: string;

    @Column({
        name: 'fileText',
        type: 'varchar',
        width: 255,
        nullable: false,
        unique: true,
    })
        fileText: string;

    @Column({
        name: 'cover',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
        unique: true,
    })
        cover?: string;

    @Column({
        name: 'fileAudio',
        type: 'varchar',
        width: 255,
        nullable: true,
        unique: true,
        default: null,
    })
        fileAudio?: string;

    @Column({
        name: 'authorId',
        type: 'int',
        nullable: false,
    })
        authorId: number;

    @OneToMany(() => AlreadyRead, (alreadyRead) => alreadyRead.book)
        alreadyRead: AlreadyRead;

    @ManyToOne(() => Authors, (author) => author.books)
    @JoinColumn({ name: 'authorId' })
        author: Authors;

    @OneToMany(() => Comments, (comment) => comment.book)
        comments: Comments[];

    @ManyToMany(() => Genres, (genres) => genres.books)
        genres: Genres[];

    @OneToMany(() => Favorites, (favorites) => favorites.book)
        favorites: Favorites[];

    @OneToMany(() => Ratings, (ratings) => ratings.book)
        ratings: Ratings[];

    @OneToMany(() => WillRead, (willRead) => willRead.book)
        willRead: WillRead;
}
