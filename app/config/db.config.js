import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('db_jwtbootcamp', 'postgres', 'admin', {
    dialect: 'postgres',
    host: 'localhost',
    port: '5432'
});
