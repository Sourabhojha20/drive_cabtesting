const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive', '5ntvxltne2r0u8zfsa17', 'pscale_pw_PxIK1oWdGbm3SzKJfgVU93uJjGTVlIu9cNwvxVa1LQ7', {
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
