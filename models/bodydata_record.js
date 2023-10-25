'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class BodydataRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      BodydataRecord.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  BodydataRecord.init({
    userId: DataTypes.INTEGER,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    skeletal_muscle: DataTypes.FLOAT,
    body_fat: DataTypes.FLOAT,
    visceral_fat_level: DataTypes.INTEGER,
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'BodydataRecord',
    tableName: 'Bodydata_Records',
    underscored: true
  })
  return BodydataRecord
}
