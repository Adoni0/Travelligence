module.exports = function (sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wealth: {
      type: DataTypes.DECIMAL(5, 1),
      allowNull: false
    },
    // cost_bracket: DataTypes.STRING, // luxury, moderate, economy
    culture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    associatedCulture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    interests: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    somethingNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  })
  return Profile
}

//   Profile {
//  location: ____,
//  wealth: ______,
//  culture: ______,
//  lang: ______,
//  interests: _____,
//  something_new: _______
// }
