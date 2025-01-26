const { DataTypes } = require('sequelize');
const sequelize = require('./database')

const Autor = sequelize.define('Autor', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome_artistico:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    genero_musical:{
        type: DataTypes.STRING
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gravadora:{
        type: DataTypes.STRING
    }}
);

module.exports = Autor