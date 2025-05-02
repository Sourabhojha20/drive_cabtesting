const { DataTypes } = require('sequelize');
const sequelize = require('../db/database').sequelize;


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.STRING,
    user_latitude:DataTypes.FLOAT,
    user_longitude:DataTypes.FLOAT,
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'user',
  });
};
