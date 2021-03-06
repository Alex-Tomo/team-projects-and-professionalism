/**
 * Non verbal reasoning questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson, W19007452
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('non_verbal_reasoning_questions', {
        question_id: {
            type: Sequelize.INTEGER
        },
        filename: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        }
    })
}