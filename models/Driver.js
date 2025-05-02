const { DataTypes } = require('sequelize');
const sequelize = require('../db/database').sequelize;

// models/Driver.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Driver', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    country_code: DataTypes.STRING,
    profile_photo: DataTypes.STRING,
    license_number: DataTypes.STRING,
    vehicle_id: DataTypes.INTEGER,
    vehicle_number: DataTypes.INTEGER,
    vehicle_model: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    status: DataTypes.BOOLEAN,
    online_status: DataTypes.BOOLEAN,
    driver_latitude:DataTypes.FLOAT,
    driver_longitude:DataTypes.FLOAT,
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'drivers',
  });
};

