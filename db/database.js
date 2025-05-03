const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive', 'q14do4pqjw32zi0r2rzn', 'pscale_pw_HySyeZtqiS0yosnSk9uxkI5CjSUo4SD9I27OUj6hk9X', {
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
