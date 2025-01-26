const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Album = sequelize.define('Album', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    nome:{
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    id_autor:{
      type: DataTypes.INTEGER,
      references:{
        model: 'Autors',
        key: 'id'
      }
    },
    duracao:{
      type: DataTypes.FLOAT,
      allowNull: false
    }});

    module.exports = Album