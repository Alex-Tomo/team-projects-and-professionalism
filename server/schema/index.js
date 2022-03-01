/**
 * This is where the schema is implimented through Sequelize. Intitializes db connection,
 * initializes the sequelize models and syncs with the remote database. This includes creating tables
 * if they don't exist. This means that databse migration is simple.
 *
 * All relationships in the database are defined here in order to keep consistency across the program.
 *
 * @author Jordan Short
 */
 const config = require('../config/db.conf.js')

 const Sequelize = require('sequelize')
 const sequelize = new Sequelize(
   config.DB,
   config.USER,
   config.PASSWORD,
   {
     host: config.HOST,
     dialect: config.dialect,
     operatorsAliases: 0,
     logging: 0,
 
     pool: {
       max: config.pool.max,
       min: config.pool.min,
       acquire: config.pool.acquire,
       idle: config.pool.idle
     }
   }
 )
 
 const db = {}
 
 // Sequelize object initialization.
 db.Sequelize = Sequelize
 db.sequelize = sequelize
 
 // Tables or models as the orm refers to them.
 db.user = require('./user.model.js')(sequelize, Sequelize)
 db.role = require('./role.model.js')(sequelize, Sequelize)
 db.lessons = require('./lessons.model.js')(sequelize, Sequelize)
 
 // Defined relationships between tables.
 db.role.belongsToMany(db.user, {
   through: 'user_roles',
   foreignKey: 'roleId',
   otherKey: 'userId'
 })
 
 db.user.belongsToMany(db.role, {
   through: 'user_roles',
   foreignKey: 'userId',
   otherKey: 'roleId'
 })
 
 db.user.hasMany(db.lessons, { foreignKey: 'id' })
 db.lessons.belongsTo(db.user, { foreignKey: 'user_id' })
 
 // Role oulines.
 db.ROLES = ['user', 'admin', 'tutor']
 
 module.exports = db 