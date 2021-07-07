const pkg = require('sequelize');
const { DataTypes } = pkg;
const sequelize = require('../database');

const Imagen = sequelize.define('imagenes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Imagen;