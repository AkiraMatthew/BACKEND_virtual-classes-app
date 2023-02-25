import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize ({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'virtualclassesapp_development',
    username: 'virtualclassesapp',
    password: '12345',
    define: {
        underscored: true,
        
    }
})