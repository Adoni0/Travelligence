module.exports = function (sequelize, DataTypes) {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    categories: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isCostName (cost) {
          if (cost === 'luxury' || cost === 'moderate' || cost === 'economy') {
            throw new Error('Only luxury, moderate, or economy is allowed!')
          }
        }
      }
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'en'
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default.jpg'
    },
    createdAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE(3),
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)'),
      allowNull: false
    }
  })

  return Country
}
