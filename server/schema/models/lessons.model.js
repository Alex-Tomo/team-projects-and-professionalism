/**
 * Lessons questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson, W19007452
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('lessons', {
        lesson_id: {
            type: Sequelize.INTEGER
        },
        lesson_name: {
            type: Sequelize.STRING
        },
        question_list: {
            type: Sequelize.STRING
        },
        lesson_type: {
            type: Sequelize.STRING
        }
    })
}
