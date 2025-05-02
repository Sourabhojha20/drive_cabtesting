// models/Vehicles_type.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db/database').sequelize;

// models/VehicleType.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('VehicleType', {
    type_name: DataTypes.STRING,
    description: DataTypes.STRING,
    fixed_charge_per_km: DataTypes.FLOAT,
    fixed_charge: DataTypes.FLOAT,
    charge_after_fixed: DataTypes.FLOAT,
    vehicle_image: DataTypes.STRING,
    vehicle_logo: DataTypes.STRING,
    platform_fee: DataTypes.FLOAT,
  }, {
    timestamps: false,
    tableName: 'vehicle_types',
  });
};
