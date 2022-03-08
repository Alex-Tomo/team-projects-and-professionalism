/**
 * This is where the schema is implimented through Sequelize. Intitializes db connection,
 * initializes the sequelize models and syncs with the remote database. This includes creating tables
 * if they don't exist. This means that databse migration is simple.
 *
 * All relationships in the database are defined here in order to keep consistency across the program.
 *
 * @author Jordan Short, Alex Thompson
 */
 const config = require('../config/db.conf.js')
 const temp_function = require('./temp_insert')

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

 db.questions = require('./models/questions.model.js')(sequelize, Sequelize)
 db.math = require('./models/math.model.js')(sequelize, Sequelize)
 db.englishStory = require('./models/englishstory.model.js')(sequelize, Sequelize)
 db.english = require('./models/english.model.js')(sequelize, Sequelize)
 db.verbalReasoning = require('./models/verbalreasoning.model.js')(sequelize, Sequelize)
 // db.nonVerbalReasoning = require('./models/nonverbalreasoning.model.js')(sequelize, Sequelize)


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

 db.questions.hasMany(db.math, {foreignKey: 'question_id'})
 db.questions.hasMany(db.english, {foreignKey: 'question_id'})
 db.questions.hasMany(db.verbalReasoning, {foreignKey: 'question_id'})
 // db.questions.hasMany(db.nonVerbalReasoning, {foreignKey: 'question_id'})
 db.englishStory.hasMany(db.english, {foreignKey: 'story_id'})

 // ONLY UNCOMMENT THIS IF WE DROP THE DATABASE
 // temp_function(db).then(r => console.log("success")).catch(e => console.log(e))

 // Role oulines.
 db.ROLES = ['user', 'admin', 'tutor']
 
 module.exports = db 