module.exports = function (sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoInrement: true,
      primaryKey: true
    },
    location: DataTypes.STRING,
    wealth: DataTypes.DECIMAL(1, 5),
    cost_bracket: DataTypes.STRING, // luxury, moderate, economy
    culture: DataTypes.STRING,
    language: DataTypes.STRING,
    interests: DataTypes.DECIMAL(1, 5),
    somethingNew: DataTypes.BOOLEAN
  })
  return Profile
}

// Profile {
// location: ____,
// wealth: ______,
// culture: ______,
// lang: ______,
// interests: _____,
// something_new: _______
// }
