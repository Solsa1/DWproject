const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Usuario = sequelize.define('usuario', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },  
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false, 
    }});

module.exports = Usuario;