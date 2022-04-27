/**
 * Questions table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson, W19007452
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('questions', {
        question_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        question_type: {
            type: Sequelize.TEXT
        }
    })
}