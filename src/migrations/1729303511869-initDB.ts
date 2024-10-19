import { MigrationInterface, QueryRunner } from "typeorm";

export class initDB1729303511869 implements MigrationInterface {
    name = 'initDB1729303511869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`quiz_question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`option_text\` text NULL, \`is_correct\` tinyint NOT NULL DEFAULT 0, \`score\` bigint NOT NULL DEFAULT '1', \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`quiz_question_id\` int NOT NULL, INDEX \`idx_quiz_question_id\` (\`quiz_question_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`question_text\` text NOT NULL, \`quiz_id\` int NOT NULL, \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`idx_quiz_id\` (\`quiz_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quizzes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`participants\` bigint UNSIGNED NOT NULL, \`difficulty\` enum ('Easy', 'Medium', 'Hard') NOT NULL DEFAULT 'Easy', \`time_limit\` bigint UNSIGNED NOT NULL, \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz_user_id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`idx_quiz_user_id\` (\`quiz_user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_sessions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz_id\` int NOT NULL, \`quiz_user_id\` varchar(255) NOT NULL, \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`idx_quiz_id\` (\`quiz_id\`), INDEX \`idx_quiz_user_id\` (\`quiz_user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz_session_id\` int NOT NULL, \`quiz_question_id\` int NOT NULL, \`quiz_question_option_id\` bigint NOT NULL, \`is_correct\` tinyint NOT NULL DEFAULT 0, \`score\` bigint NOT NULL DEFAULT '0', \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`quiz_question_option__id\` int NULL, INDEX \`idx_quiz_session_id\` (\`quiz_session_id\`), INDEX \`idx_quiz_question_id\` (\`quiz_question_id\`), INDEX \`idx_quiz_question_option_id\` (\`quiz_question_option_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`quiz_leaderboard\` (\`id\` int NOT NULL AUTO_INCREMENT, \`quiz_id\` int NOT NULL, \`quiz_user_id\` varchar(255) NOT NULL, \`score\` bigint NOT NULL DEFAULT '0', \`created_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, INDEX \`idx_quiz_id\` (\`quiz_id\`), INDEX \`idx_quiz_user_id\` (\`quiz_user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`quiz_question_options\` ADD CONSTRAINT \`FK_fdd66b41d59e7eb4f5c6d6097d1\` FOREIGN KEY (\`quiz_question_id\`) REFERENCES \`quiz_questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_sessions\` ADD CONSTRAINT \`FK_7d5e2cc965658e66690ca6533cd\` FOREIGN KEY (\`quiz_id\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_sessions\` ADD CONSTRAINT \`FK_4b88a6ae7b7350c26e1354fe6d1\` FOREIGN KEY (\`quiz_user_id\`) REFERENCES \`quiz_users\`(\`quiz_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` ADD CONSTRAINT \`FK_f234e11a2d06c1c98edc00066c2\` FOREIGN KEY (\`quiz_session_id\`) REFERENCES \`quiz_sessions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` ADD CONSTRAINT \`FK_ffc3a21a6d2d56327fb85387f8d\` FOREIGN KEY (\`quiz_question_id\`) REFERENCES \`quiz_questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` ADD CONSTRAINT \`FK_35cd914ca04d2df4e211031dc8f\` FOREIGN KEY (\`quiz_question_option__id\`) REFERENCES \`quiz_question_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_leaderboard\` ADD CONSTRAINT \`FK_6589d560443182825af55facc6f\` FOREIGN KEY (\`quiz_id\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`quiz_leaderboard\` ADD CONSTRAINT \`FK_b607f2ba7d251e0c32517ffb305\` FOREIGN KEY (\`quiz_user_id\`) REFERENCES \`quiz_users\`(\`quiz_user_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`quiz_leaderboard\` DROP FOREIGN KEY \`FK_b607f2ba7d251e0c32517ffb305\``);
        await queryRunner.query(`ALTER TABLE \`quiz_leaderboard\` DROP FOREIGN KEY \`FK_6589d560443182825af55facc6f\``);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` DROP FOREIGN KEY \`FK_35cd914ca04d2df4e211031dc8f\``);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` DROP FOREIGN KEY \`FK_ffc3a21a6d2d56327fb85387f8d\``);
        await queryRunner.query(`ALTER TABLE \`quiz_answers\` DROP FOREIGN KEY \`FK_f234e11a2d06c1c98edc00066c2\``);
        await queryRunner.query(`ALTER TABLE \`quiz_sessions\` DROP FOREIGN KEY \`FK_4b88a6ae7b7350c26e1354fe6d1\``);
        await queryRunner.query(`ALTER TABLE \`quiz_sessions\` DROP FOREIGN KEY \`FK_7d5e2cc965658e66690ca6533cd\``);
        await queryRunner.query(`ALTER TABLE \`quiz_question_options\` DROP FOREIGN KEY \`FK_fdd66b41d59e7eb4f5c6d6097d1\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_user_id\` ON \`quiz_leaderboard\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_id\` ON \`quiz_leaderboard\``);
        await queryRunner.query(`DROP TABLE \`quiz_leaderboard\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_question_option_id\` ON \`quiz_answers\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_question_id\` ON \`quiz_answers\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_session_id\` ON \`quiz_answers\``);
        await queryRunner.query(`DROP TABLE \`quiz_answers\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_user_id\` ON \`quiz_sessions\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_id\` ON \`quiz_sessions\``);
        await queryRunner.query(`DROP TABLE \`quiz_sessions\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_user_id\` ON \`quiz_users\``);
        await queryRunner.query(`DROP TABLE \`quiz_users\``);
        await queryRunner.query(`DROP TABLE \`quizzes\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_id\` ON \`quiz_questions\``);
        await queryRunner.query(`DROP TABLE \`quiz_questions\``);
        await queryRunner.query(`DROP INDEX \`idx_quiz_question_id\` ON \`quiz_question_options\``);
        await queryRunner.query(`DROP TABLE \`quiz_question_options\``);
    }

}
