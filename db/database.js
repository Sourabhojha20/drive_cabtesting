const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive', 'luwgdul7hppi2jbz45u2', 'pscale_pw_y0av7DdyyTMWlvTOG2ybUke6PeWSJkWEY1MKGJaYUq3', {
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
