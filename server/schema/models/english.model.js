/**
 * English questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('english_questions', {
        question_id: {
            type: Sequelize.INTEGER
        },
        story_id: {
            type: Sequelize.INTEGER
        },
        question: {
            type: Sequelize.TEXT
        },
        answer: {
            type: Sequelize.TEXT
        },
        incorrect_answer_one: {
            type: Sequelize.TEXT
        },
        incorrect_answer_two: {
            type: Sequelize.TEXT
        },
        incorrect_answer_three: {
            type: Sequelize.TEXT
        },
        incorrect_answer_four: {
            type: Sequelize.TEXT
        }
    })
}