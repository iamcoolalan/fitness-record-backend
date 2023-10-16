'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      Food.belongsTo(models.FoodCategory, { foreignKey: 'foodCategoryId' })

      Food.hasMany(models.MealDetail, { foreignKey: 'foodId' })
    }
  }
  Food.init({
    foodCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    protein: DataTypes.FLOAT,
    fat: DataTypes.FLOAT,
    carbohydrates: DataTypes.FLOAT,
    defaultServingSize: DataTypes.FLOAT,
    calories: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Food',
    tableName: 'Food',
    underscored: true
  })
  return Food
}
