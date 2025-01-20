const { DataTypes, Model } = require('sequelize');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Album = sequelize.define('Album', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        notNull: true,
        AutoIncrement: true,
    },
    nome:{
      type: DataTypes.STRING,
      uniqueKey: true,
      notNull: true
    },
    id_autor:{
      type: DataTypes.INTEGER,
      references:{
        Model: 'Autor',
        key: 'id'
      }
    },
    duracao:{
      type: DataTypes.FLOAT,
      notNull: true
    }},{
      tableName: 'Album'
    })

    module.exports = Album