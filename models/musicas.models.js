const { DataType, DataTypes } = require('sequelize');
const sequelize = require('.../config/database');

const Musica = sequelize.define('Musica', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        AutoIncrement: true,
    },
    nome:{
        type: DataTypes.STRING,
        notNull: true,
    },
    duracao:{
        type: DataTypes.STRING,
        notNull: true,
    },
    lyric:{
        type: DataTypes.STRING,
        notNull: false,
    }},{
        tableName: 'musicas'
})

module.exports = Musica