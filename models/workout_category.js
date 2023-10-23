'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkoutCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkoutCategory.hasMany(models.WorkoutDetail, { foreignKey: 'WorkoutCategoryId' })
    }
  }
  WorkoutCategory.init({
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    isAddable: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkoutCategory',
    tableName: 'Workout_Categories',
    underscored: true
  })
  return WorkoutCategory
}
