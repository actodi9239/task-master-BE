const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('notes_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

// Sincroniza la base de datos y aplica alteraciones automáticas
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synchronized with the models');
    })
    .catch((err) => {
        console.error('Error synchronizing database:', err);
    });

module.exports = sequelize;
