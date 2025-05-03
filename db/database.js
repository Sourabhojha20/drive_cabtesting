const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive', 'cabdrive', 'wqaDI%Y7}gpf', {
  host: '44.227.217.144',
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true
    }
  }
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
module.exports.sequelize = sequelize; 
