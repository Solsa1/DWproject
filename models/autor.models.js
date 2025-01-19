const { DataTypes } = require('sequelize');
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
        notNull: true
    },
    email:{
        type: DataTypes.STRING,
        notNull: true,
    },
    nome_artistico:{
        type: DataTypes.STRING,
        notNull: true,
        uniqueKey: true
    },
    genero_musical:{
        type: DataTypes.STRING
    },
    senha:{
        type: DataType.STRING,
        notNull: true
    },
    gravadora:{
        type: DataType.STRING
    }}, {
        tableName: 'Autor'
    }
)

module.exports = Autor