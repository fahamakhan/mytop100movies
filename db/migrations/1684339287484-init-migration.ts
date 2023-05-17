import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1684339287484 implements MigrationInterface {
    name = 'InitMigration1684339287484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ratings" ("id" SERIAL NOT NULL, "rating" numeric(5,2) NOT NULL, "movieId" integer, "userId" integer, CONSTRAINT "PK_0f31425b073219379545ad68ed9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_movies_movies" ("usersId" integer NOT NULL, "moviesId" integer NOT NULL, CONSTRAINT "PK_739428d055c912d14188efdce20" PRIMARY KEY ("usersId", "moviesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d71a9d25f034499e3a454ee94e" ON "users_movies_movies" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5039c58d6d552a11126f3fe8fa" ON "users_movies_movies" ("moviesId") `);
        await queryRunner.query(`CREATE TABLE "movies_users_users" ("moviesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_0bad2bdd9f5173940eb6afebcde" PRIMARY KEY ("moviesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5e2bfa10013c136335b4f926d3" ON "movies_users_users" ("moviesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e7a6282e78e7e0468ff9a386c" ON "movies_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_c10d219b6360c74a9f2186b76df" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ratings" ADD CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_movies_movies" ADD CONSTRAINT "FK_d71a9d25f034499e3a454ee94e3" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_movies_movies" ADD CONSTRAINT "FK_5039c58d6d552a11126f3fe8fa0" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "movies_users_users" ADD CONSTRAINT "FK_5e2bfa10013c136335b4f926d3e" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_users_users" ADD CONSTRAINT "FK_9e7a6282e78e7e0468ff9a386c8" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_users_users" DROP CONSTRAINT "FK_9e7a6282e78e7e0468ff9a386c8"`);
        await queryRunner.query(`ALTER TABLE "movies_users_users" DROP CONSTRAINT "FK_5e2bfa10013c136335b4f926d3e"`);
        await queryRunner.query(`ALTER TABLE "users_movies_movies" DROP CONSTRAINT "FK_5039c58d6d552a11126f3fe8fa0"`);
        await queryRunner.query(`ALTER TABLE "users_movies_movies" DROP CONSTRAINT "FK_d71a9d25f034499e3a454ee94e3"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_4d0b0e3a4c4af854d225154ba40"`);
        await queryRunner.query(`ALTER TABLE "ratings" DROP CONSTRAINT "FK_c10d219b6360c74a9f2186b76df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9e7a6282e78e7e0468ff9a386c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e2bfa10013c136335b4f926d3"`);
        await queryRunner.query(`DROP TABLE "movies_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5039c58d6d552a11126f3fe8fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d71a9d25f034499e3a454ee94e"`);
        await queryRunner.query(`DROP TABLE "users_movies_movies"`);
        await queryRunner.query(`DROP TABLE "movies"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "ratings"`);
    }

}
