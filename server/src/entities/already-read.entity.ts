import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { Users } from './users.entity';
import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';

@Entity()
export class AlreadyRead extends CommonsFields {
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

    @ManyToOne(() => Users, (user) => user.alreadyRead)
    @JoinColumn({ name: 'userId' })
        user: Users;

    @ManyToOne(() => Books, (books) => books.alreadyRead)
    @JoinColumn({ name: 'bookId' })
        book: Books;
}
