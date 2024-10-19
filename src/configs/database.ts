import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { registerAs } from '@nestjs/config';

export const CONFIG_DATABASE = 'database';
export const configFactory = () => ({
  type: String(process.env.TYPEORM_CONNECTION) as MysqlConnectionOptions['type'],
  host: String(process.env.TYPEORM_HOST),
  port: Number(process.env.TYPEORM_PORT),
  username: String(process.env.TYPEORM_USERNAME),
  password: String(process.env.TYPEORM_PASSWORD),
  database: String(process.env.TYPEORM_DATABASE),
  logging: process.env.TYPEORM_LOGGING === 'true',
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  entities: [`${__dirname}/../**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/../migrations/*.{ts,js}`],
  // Extra
  extra: {
    charset: 'utf8mb4_unicode_ci',
    connectionLimit: process.env.TYPEORM_CONNECTION_LIMIT || 100,
  },
  timezone: 'Z',
  namingStrategy: new SnakeNamingStrategy(),
});

export default registerAs<MysqlConnectionOptions>(CONFIG_DATABASE, configFactory);
