/**
 *
 * Who added the user table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * added_user refers to the newly created account
 * added_by refers to the user who created the account
 *
 * @author Alex Thompson, W19007452
 */

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('user_added_by', {
        added_user: {
            type: Sequelize.INTEGER
        },
        added_by: {
            type: Sequelize.INTEGER
        },
        added_by_name: {
            type: Sequelize.STRING
        }
    })
}