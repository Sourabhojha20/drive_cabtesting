const { DataTypes } = require('sequelize');
const sequelize = require('../db/database').sequelize;

// models/Wallet.js
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Wallet', {
      user_id: DataTypes.INTEGER,
      balance: DataTypes.FLOAT,
    }, {
      timestamps: false,
      tableName: 'wallets',
    });
  };
  