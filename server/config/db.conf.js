/**
 * Database configuration, outlines and exports the key parameters
 * for the ORM being used (Sequelize). This is currently a test database
 * and will be changed to a more secure implimentation for production.
 *
 * @author Jordan Short
 */
 module.exports = {
    HOST: 'remotemysql.com',
    USER: 'QqF6fFPRSl',
    PASSWORD: 'D0TjJ74ekb',
    DB: 'QqF6fFPRSl',
    dialect: 'mysql',
    pool: {
      max: 7,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }  