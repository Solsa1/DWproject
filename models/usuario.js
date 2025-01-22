const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Usuario = sequelize.define('Usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },  
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        uniqueKey: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false, 
    }},
    {
        tableName: 'Usuario',
});

module.exports = Usuario;