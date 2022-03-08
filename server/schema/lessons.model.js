/**
 * Lessons table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Jordan Short
 *
 */
 module.exports = (sequelize, Sequelize) => {
    const lessons = sequelize.define('lessons', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      lesson_name: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER(11)
      }
    })
  
    return lessons
  }  