import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
    synchronize: true,
    entities: ['src/entity/*.ts']
});