import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1656501169388 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE  Users(
                id SERIAL PRIMARY KEY NOT NULL,
                nickName VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role VARCHAR(5) DEFAULT 'USER',
                createdAt TIMESTAMP WITHOUT TIME ZONE DEFAULT current_timestamp NOT NULL,
                deletedAt TIMESTAMP WITHOUT TIME ZONE       
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        DROP TABLE IF EXIST Users
        `);
    }
}
