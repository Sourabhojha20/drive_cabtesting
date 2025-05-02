const { DataTypes } = require('sequelize');
const sequelize = require('../db/database').sequelize;


// models/Ride.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Ride', {
      user_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
      pickup_address: DataTypes.STRING,
      dropoff_address: DataTypes.STRING,
      pickup_lat: DataTypes.FLOAT,
      pickup_lng: DataTypes.FLOAT,
      dropoff_lat: DataTypes.FLOAT,
      dropoff_lng: DataTypes.FLOAT,
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'completed', 'cancelled'),
        defaultValue: 'pending'
      },
      fare_estimate: DataTypes.FLOAT,
      final_fare: DataTypes.FLOAT,
      distance_km: DataTypes.FLOAT,
      duration_min: DataTypes.FLOAT,
      scheduled_at: DataTypes.DATE,
      completed_at: DataTypes.DATE,
    }, {
      timestamps: false,
      tableName: 'rides',
    });
  };

  