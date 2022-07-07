import {
    Column, Entity, JoinColumn, ManyToOne,
} from 'typeorm';

import { CommonsFields } from './commons-fields.entity';
import { Users } from './users.entity';
import { Books } from './books.entity';

@Entity()
export class Ratings extends CommonsFields {
    @Column({
        name: 'rate',
        type: 'int',
        nullable: false,
    })
        rate: number;

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

    @ManyToOne(() => Books, (books) => books.ratings)
    @JoinColumn({ name: 'bookId' })
        book: Books;

    @ManyToOne(() => Users, (user) => user.ratings)
    @JoinColumn({ name: 'userId' })
        user: Users;
}
