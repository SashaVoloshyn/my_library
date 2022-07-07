import {
    Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { AlreadyRead } from './already-read.entity';
import { Authors } from './authors.entity';
import { Comments } from './comments.entity';
import { Favorites } from './favorites.entity';
import { Genres } from './genres.entity';
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

    @ManyToMany(() => Genres, (genres) => genres.books)
        genres: Genres[];

    @OneToMany(() => AlreadyRead, (alreadyRead) => alreadyRead.book)
        alreadyRead: AlreadyRead;

    @OneToMany(() => WillRead, (willRead) => willRead.book)
        willRead: WillRead;

    @OneToMany(() => Favorites, (favorites) => favorites.book)
        favorites: Favorites[];

    @OneToMany(() => Comments, (comment) => comment.book)
        comments: Comments[];

    @ManyToOne(() => Authors, (author) => author.books)
    @JoinColumn({ name: 'authorId' })
        author: Authors;

    @OneToMany(() => Ratings, (ratings) => ratings.book)
        ratings: Ratings[];
}
