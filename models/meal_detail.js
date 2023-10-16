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
      MealDetail.belongsTo(models.MealRecord, { foreignKey: 'mealRecordId' })

      MealDetail.belongsTo(models.Food, { foreignKey: 'foodId' })
    }
  }
  MealDetail.init({
    mealRecordId: DataTypes.INTEGER,
    foodId: DataTypes.INTEGER,
    servingSize: DataTypes.FLOAT,
    numberOfServings: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'MealDetail',
    tableName: 'MealDetails',
    underscored: true
  })
  return MealDetail
}
