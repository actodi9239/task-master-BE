const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Si el certificado es auto-firmado
        }
    }
});

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized with the models');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });

module.exports = sequelize;
