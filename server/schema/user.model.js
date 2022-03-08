/**
 * User table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Jordan Short
 *
 */
 module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    })
  
    return User
  }