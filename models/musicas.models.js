const { DataTypes, Model } = require('sequelize');
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
        type: DataTypes.FLOAT,
        notNull: true,
    },
    lyric:{
        type: DataTypes.STRING,
        notNull: false,
    },
    id_album: {
        type: DataTypes.INTEGER,
        references:{
            Model:'Album',
            key:'id'
        }
    }},{
        tableName: 'musicas'
})

module.exports = Musica