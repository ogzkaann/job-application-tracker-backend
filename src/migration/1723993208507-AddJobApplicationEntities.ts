import { MigrationInterface, QueryRunner } from "typeorm";

export class AddJobApplicationEntities1723993208507 implements MigrationInterface {
    name = 'AddJobApplicationEntities1723993208507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "language" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "language"`);
    }

}
