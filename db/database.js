const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mycpanel_cabdrive', 'mycpanel_cabdrive', 'wqaDI%Y7}gpf', {
  host: '68.178.151.225',
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
module.exports.sequelize = sequelize; 
