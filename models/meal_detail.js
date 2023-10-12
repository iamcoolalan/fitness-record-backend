'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class MealDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  MealDetail.init({
    mealRecordId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MealDetail',
    tableName: 'MealDetails',
    underscored: true
  })
  return MealDetail
}
