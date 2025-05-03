const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cabdrive', 'jsq6g7v75c3j6pm5xci5', 'pscale_pw_dG39MxErPcjKcAcpHF5zu4pIdh58FGhmyfi9WUMg455', {
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
