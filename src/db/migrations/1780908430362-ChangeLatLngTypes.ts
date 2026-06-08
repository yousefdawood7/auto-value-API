import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeLatLngTypes1780908430362 implements MigrationInterface {
    name = 'ChangeLatLngTypes1780908430362'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "lng"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "latitude" numeric(10,7) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "longitude" numeric(11,7) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "report" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lng" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "report" ADD "lat" integer NOT NULL`);
    }

}
