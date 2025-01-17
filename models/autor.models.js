const { DataType, DataTypes } = require('sequelize');
const sequelize = require('.../config/database');

const Autor = sequelize.define('Autor', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        AutoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING,
        notNull: true,
        uniqueKey: true
    }
)