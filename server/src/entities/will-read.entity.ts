import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';
import { Books } from './books.entity';

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

    @ManyToOne(() => Users, (user) => user.willRead)
    @JoinColumn({ name: 'userId' })
        user: Users;

    @ManyToOne(() => Books, (books) => books.willRead)
    @JoinColumn({ name: 'bookId' })
        book: Books;
}
