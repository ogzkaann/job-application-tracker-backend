import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobApplicationEntities1723993390366 implements MigrationInterface {
    name = 'AddJobApplicationEntities1723993390366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "language"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "language" character varying NOT NULL`);
    }

}
