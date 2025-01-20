const { DataTypes, Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

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
        type: DataTypes.STRING,
        notNull: true
    },
    gravadora:{
        type: DataTypes.STRING
    }}, {
        tableName: 'Autor'
    }
)

module.exports = Autor