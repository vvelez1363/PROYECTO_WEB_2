const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');

const Receta = sequelize.define(
    'recetas',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        tiempo_preparacion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        dificultad: {
            type: DataTypes.ENUM('Fácil', 'Moderada', 'Difícil'),
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Receta;