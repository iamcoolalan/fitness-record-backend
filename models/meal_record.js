'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MealRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      MealRecord.belongsTo(models.User, { foreignKey: 'userId' })

      MealRecord.hasMany(models.MealDetail, { foreignKey: 'mealRecordId' })
    }
  }
  MealRecord.init({
    userId: DataTypes.INTEGER,
    type: DataTypes.ENUM('breakfast', 'lunch', 'dinner', 'extra', 'water')
  }, {
    sequelize,
    modelName: 'MealRecord',
    tableName: 'MealRecords',
    underscored: true
  })
  return MealRecord
}
