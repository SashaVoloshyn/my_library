import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs(extend(utc));

@Entity()
export class CommonsFields {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
        id: number;

    @Column({
        name: 'createdAt',
        type: 'timestamp',
        nullable: false,
        default: dayjs().utc().format(),
    })
        createdAt: string;

    @Column({
        name: 'deletedAt',
        type: 'timestamp',
        nullable: true,
    })
        deletedAt?: string;
}
