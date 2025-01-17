const { DataType, DataTypes } = require('sequelize');
const sequelize = require('.../config/database');

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        AutoIncrement: true
    },  
    email: {
        type: DataTypes.STRING,
        notNull: true,
        uniqueKey: true
    },
    senha:{
        type: DataTypes.STRING,
        notNull: true,
    },
    nome:{
        type: DataTypes.STRING,
        notNull: true, 
    }},
    {
        tableName: 'usuarios',
});

module.exports = Usuario;