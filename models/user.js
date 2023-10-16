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
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female'),
    activityFactor: DataTypes.ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'),
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    skeletalMuscle: DataTypes.FLOAT,
    bodyFat: DataTypes.FLOAT,
    visceralFatLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
