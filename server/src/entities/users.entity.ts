import {
    Column, Entity, OneToMany,
} from 'typeorm';

import { AlreadyRead } from './already-read.entity';
import { RoleEnum } from '../enums';
import { CommonsFields } from './commons-fields.entity';
import { Comments } from './comments.entity';
import { Favorites } from './favorites.entity';
import { Ratings } from './ratings.entity';
import { WillRead } from './will-read.entity';

@Entity()
export class Users extends CommonsFields {
    @Column({
        name: 'nickName',
        type: 'varchar',
        unique: true,
        width: 50,
        nullable: false,
    })
        nickName: string;

    @Column({
        name: 'password',
        type: 'varchar',
        width: 255,
        nullable: false,
    })
        password: string;

    @Column({
        name: 'email',
        type: 'varchar',
        unique: true,
        width: 255,
        nullable: false,
    })
        email: string;

    @Column({
        name: 'role',
        type: 'varchar',
        width: 5,
        nullable: true,
        default: RoleEnum.USER,
    })
        role?: string;

    @Column({
        name: 'avatar',
        type: 'varchar',
        width: 255,
        nullable: true,
        default: null,
    })
        avatar?: string;

    @OneToMany(() => AlreadyRead, (alreadyRead) => alreadyRead.user)
        alreadyRead: AlreadyRead[];

    @OneToMany(() => Comments, (comments) => comments.user)
        comments: Comments[];

    @OneToMany(() => Ratings, (ratings) => ratings.user)
        ratings: Ratings[];

    @OneToMany(() => Favorites, (favorites) => favorites.user)
        favorites: Favorites[];

    @OneToMany(() => WillRead, (willRead) => willRead.user)
        willRead: WillRead[];
}
