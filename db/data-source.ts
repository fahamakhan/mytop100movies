import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment variables from a .env file
config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/src/**/entities/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
}
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
