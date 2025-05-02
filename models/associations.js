module.exports = (db) => {
  const {
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
    Otp, // Make sure Otp is included
  } = db;

  // User ↔ Ride
  User.hasMany(Ride, { foreignKey: 'user_id' });
  Ride.belongsTo(User, { foreignKey: 'user_id' });

  // Driver ↔ Ride
  Driver.hasMany(Ride, { foreignKey: 'driver_id' });
  Ride.belongsTo(Driver, { foreignKey: 'driver_id' });

  // Driver ↔ DriverDocument
  Driver.hasMany(DriverDocument, { foreignKey: 'driver_id' });
  DriverDocument.belongsTo(Driver, { foreignKey: 'driver_id' });

  // VehicleType ↔ Driver
  VehicleType.hasMany(Driver, { foreignKey: 'vehicle_id' });
  Driver.belongsTo(VehicleType, { foreignKey: 'vehicle_id' });

  // Ride ↔ Payment
  Ride.hasOne(Payment, { foreignKey: 'ride_id' });
  Payment.belongsTo(Ride, { foreignKey: 'ride_id' });

  // User ↔ Wallet
  User.hasOne(Wallet, { foreignKey: 'user_id' });
  Wallet.belongsTo(User, { foreignKey: 'user_id' });

  // Wallet ↔ WalletTransaction
  Wallet.hasMany(WalletTransaction, { foreignKey: 'wallet_id' });
  WalletTransaction.belongsTo(Wallet, { foreignKey: 'wallet_id' });

  // Ride ↔ SplitPayments
  Ride.hasMany(SplitPayment, { foreignKey: 'ride_id' });

  // User ↔ SplitPayment (payer and split_with)
  User.hasMany(SplitPayment, { foreignKey: 'payer_user_id', as: 'Payer' });
  User.hasMany(SplitPayment, { foreignKey: 'split_with_user_id', as: 'SplitWith' });

  // Ride ↔ Rating
  Ride.hasMany(Rating_Reviews, { foreignKey: 'ride_id' });
  Rating_Reviews.belongsTo(Ride, { foreignKey: 'ride_id' });

  // User ↔ Rating
  User.hasMany(Rating_Reviews, { foreignKey: 'user_id' });
  Driver.hasMany(Rating_Reviews, { foreignKey: 'driver_id' });

  // ✅ OTP ↔ User
  User.hasMany(Otp, { foreignKey: 'user_id' });
  Otp.belongsTo(User, { foreignKey: 'user_id' });

  // ✅ OTP ↔ Driver
  Driver.hasMany(Otp, { foreignKey: 'user_id' });
  Otp.belongsTo(Driver, { foreignKey: 'user_id' });
};
