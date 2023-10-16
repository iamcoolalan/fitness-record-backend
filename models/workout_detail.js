'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkoutDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkoutDetail.belongsTo(models.WorkoutCategory, { foreignKey: 'WorkoutCategoryId' })

      WorkoutDetail.belongsTo(models.WorkoutRecord, { foreignKey: 'workoutRecordId' })
    }
  }
  WorkoutDetail.init({
    workoutRecordId: DataTypes.INTEGER,
    workoutCategoryId: DataTypes.INTEGER,
    set: DataTypes.INTEGER,
    repetitions: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'WorkoutDetail',
    tableName: 'WorkoutDetails',
    underscored: true
  })
  return WorkoutDetail
}
