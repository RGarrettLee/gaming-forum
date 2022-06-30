const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const slugify = require('slugify');

class Board extends Model {}

Board.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        slug: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newBoard) => { // slugify name into url
                newBoard.slug = slugify(newBoard.name.toLowerCase());
                return newBoard
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'board',
    }
);

module.exports = Board;