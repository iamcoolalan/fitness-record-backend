'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkoutRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkoutRecord.hasMany(models.WorkoutDetail, { foreignKey: 'workoutRecordId' })

      WorkoutRecord.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  WorkoutRecord.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN,
    workoutTime: DataTypes.INTEGER,
    trainingVolume: DataTypes.INTEGER,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'WorkoutRecord',
    tableName: 'Workout_Records',
    underscored: true
  })
  return WorkoutRecord
}
