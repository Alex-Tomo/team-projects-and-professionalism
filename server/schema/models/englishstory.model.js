/**
 * English Story table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Alex Thompson
 *
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('english_story', {
        story_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.TEXT
        },
        story: {
            type: Sequelize.TEXT
        }
    })
}