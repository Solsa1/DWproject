const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Musica = sequelize.define('Musica', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    duracao:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    lyric:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_album: {
        type: DataTypes.INTEGER,
        references:{
            model:'Albums',
            key:'id'
        }
    }});

module.exports = Musica