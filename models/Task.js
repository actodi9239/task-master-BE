const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATEONLY, // Cambiado a DATEONLY para solo almacenar la fecha
        allowNull: false, // Asegura que la fecha siempre esté presente
    },
    important: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending', // Valor por defecto
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Task;
