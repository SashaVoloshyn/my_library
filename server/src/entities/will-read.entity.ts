import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { Books } from './books.entity';
import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';

@Entity()
export class WillRead extends CommonsFields {
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

    @ManyToOne(() => Books, (books) => books.willRead)
    @JoinColumn({ name: 'bookId' })
        book: Books;

    @ManyToOne(() => Users, (user) => user.willRead)
    @JoinColumn({ name: 'userId' })
        user: Users;
}
