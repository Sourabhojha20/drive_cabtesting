// models/index.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/database');

// Import model definitions
const User = require('./User')(sequelize, DataTypes);
const Driver = require('./Driver')(sequelize, DataTypes);
const DriverDocument = require('./DriverDocument')(sequelize, DataTypes);
const VehicleType = require('./VehicleType')(sequelize, DataTypes);
const Ride = require('./Ride')(sequelize, DataTypes);
const Payment = require('./Payment')(sequelize, DataTypes);
const SplitPayment = require('./SplitPayment')(sequelize, DataTypes);
const FareEstimation = require('./FareEstimation')(sequelize, DataTypes);
const Wallet = require('./Wallet')(sequelize, DataTypes);
const WalletTransaction = require('./WalletTransaction')(sequelize, DataTypes);
const Rating_Reviews = require('./Rating_Reviews')(sequelize, DataTypes);
const Otp = require('./Otp')(sequelize, DataTypes);

// Bundle models together
const db = {
  sequelize,
  User,
  Driver,
  DriverDocument,
  VehicleType,
  Ride,
  Payment,
  SplitPayment,
  FareEstimation,
  Wallet,
  WalletTransaction,
  Rating_Reviews,
  Otp
};

module.exports = db;
