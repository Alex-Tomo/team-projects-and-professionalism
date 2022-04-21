/**
 * Verbal reasoning questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('verbal_reasoning_questions', {
        question_id: {
            type: Sequelize.INTEGER
        },
        example: {
            type: Sequelize.TEXT
        },
        question: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        },
        type: {
            type: Sequelize.INTEGER
        }
    })
}