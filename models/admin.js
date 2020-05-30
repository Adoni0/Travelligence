module.exports = function (sequelize, DataTypes) {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  })

  return Admin
}
