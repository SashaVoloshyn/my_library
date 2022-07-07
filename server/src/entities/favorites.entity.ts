import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';

@Entity()
export class Favorites extends CommonsFields {
    @Column({
        name: 'userId',
        type: 'int',
        nullable: false,
    })
        userId: number;

    @Column({
        name: 'bookId',
        type: 'int',
        nullable: false,
    })
        bookId: number;

    @ManyToOne(() => Books, (books) => books.alreadyRead)
    @JoinColumn({ name: 'bookId' })
        book: Books;

    @ManyToOne(() => Users, (user) => user.alreadyRead)
    @JoinColumn({ name: 'userId' })
        user: Users;
}
