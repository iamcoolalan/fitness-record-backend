'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      User.hasMany(models.MealRecord, { foreignKey: 'userId' })

      User.hasMany(models.WorkoutRecord, { foreignKey: 'userId' })

      User.hasMany(models.BodydataRecord, { foreignKey: 'userId' })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female'),
    activityFactor: DataTypes.ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'),
    targetHeight: DataTypes.FLOAT,
    targetWeight: DataTypes.FLOAT,
    targetSkeletalMuscle: DataTypes.FLOAT,
    targetBodyFat: DataTypes.FLOAT,
    targetVisceralFatLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
