const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive','ls81bevgwqjf3g2fbwnb','pscale_pw_idq8pCmeF4WCMm8vNG5CX9dlN6iA6CCNPdI5uJwnvUN', {
  host: 'aws.connect.psdb.cloud',
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
    console.log('✅ PlanetScale MySQL Connected');
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
};

module.exports = connectdb;
module.exports.sequelize = sequelize;
