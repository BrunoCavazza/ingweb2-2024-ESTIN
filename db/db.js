import Sequelize from "@sequelize/core";

const appDataSource = new Sequelize({
    type: 'postgres',
    database: 'estindb',
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice',
});

module.exports = appDataSource;