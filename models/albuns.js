const { DataTypes } = require('sequelize');
const sequelize = require('../database');

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
      allowNull: false,
      references:{
        model: 'Autors',
        key: 'id'
      }
    }
    });

    module.exports = Album