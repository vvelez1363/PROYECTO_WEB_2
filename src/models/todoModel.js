const { DataTypes } = require('sequelize');
const sequelize = require('../../db/sequelize');
const Receta = require('./recetaModel');

const Todo = sequelize.define(
    'todos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        recetaId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'recetaId',
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Todo.belongsTo(Receta, {
    foreignKey: 'recetaId', 
    targetKey: 'id',
    onDelete: 'CASCADE',
});

module.exports = Todo;