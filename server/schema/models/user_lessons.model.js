/**
 * Users Lessons questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson
 *
 */

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user_lessons', {
    lesson_id: {
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    completed: {
      type: Sequelize.BOOLEAN
    },
    user_score: {
      type: Sequelize.INTEGER
    },
    possible_score: {
      type: Sequelize.INTEGER
    }
  })
}