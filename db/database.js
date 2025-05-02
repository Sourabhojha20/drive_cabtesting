const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('unitedcabs', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL Connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
};

module.exports = connectdb;
module.exports.sequelize = sequelize; // Optional: export sequelize instance for models
