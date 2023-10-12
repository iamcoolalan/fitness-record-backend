'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class FoodCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      FoodCategory.hasMany(models.Food, { foreignKey: 'foodCategoryId' })
    }
  }
  FoodCategory.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FoodCategory',
    tableName: 'FoodCategories',
    underscored: true
  })
  return FoodCategory
}
