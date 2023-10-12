'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class WorkoutMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      WorkoutMovement.belongsTo(models.TrainingType, { foreignKey: 'trainingTypeId' })

      WorkoutMovement.hasMany(models.WorkoutDetail, { foreignKey: 'workoutMovementId' })
    }
  }
  WorkoutMovement.init({
    trainingTypeId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'WorkoutMovement',
    tableName: 'WorkoutMovements',
    underscored: true
  })
  return WorkoutMovement
}
