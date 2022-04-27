/**
 * Math questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson, W19007452
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('math_questions', {
        question_id: {
            type: Sequelize.INTEGER
        },
        statement: {
            type: Sequelize.TEXT
        },
        question: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        },
        question_type: {
            type: Sequelize.INTEGER
        }
    })
}