/**
 * Role table (model). Framework for the table.
 * These should not be amended unless the database has been dropped
 * or rolled back.
 *
 * @author Jordan Short
 *
 */
 module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('roles', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    }
  })

  return Role
}