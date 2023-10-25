const { Op } = require('sequelize')
const { sequelize, WorkoutRecord, WorkoutDetail } = require('../models')

const workoutRecordServices = {
  getRecordsByRange: async (userId, endDate, startDate = endDate) => {
    try {
      const endDateToQuery = new Date(endDate)
      const startDateToQuery = new Date(startDate)

      const records = WorkoutRecord.findAndCountAll({
        where: {
          userId,
          date: {
            [Op.gte]: startDateToQuery,
            [Op.lte]: endDateToQuery
          }
        },
        order: [['date', 'ASC']],
        raw: true
      })

      return records
    } catch (error) {
      console.log(error)
      throw new Error('Failed to find records')
    }
  },

  getRecordDetail: async (workoutRecordId) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        include: [WorkoutDetail]
      })

      return record
    } catch (error) {
      throw new Error('Failed to find record')
    }
  },

  createNewRecord: async (userId, date, name) => {
    try {
      const record = await WorkoutRecord.create({
        userId,
        date,
        name: name || undefined
      })

      return record
    } catch (error) {
      throw new Error('Failed to create record')
    }
  },

  editRecord: async (workoutRecordId, data) => {
    const { name, date, isDone, workoutTime } = data

    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId)

      if (record) {
        const updateData = {
          ...record.get(),
          name,
          date,
          isDone,
          workoutTime
        }

        const updatedRecord = await record.update(updateData)

        return updatedRecord
      } else {
        throw new Error('Can not find this record')
      }
    } catch (error) {
      throw new Error('Failed to update record')
    }
  },

  deleteRecord: async (workoutRecordId) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId)

      if (record) {
        const deletedRecord = await record.destroy()

        return deletedRecord
      } else {
        throw new Error('Can not find this record')
      }
    } catch (error) {
      throw new Error('Failed to delete record')
    }
  },

  createRecordDetail: async (workoutRecordId, workoutDetails) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        attributes: ['id'],
        raw: true
      })

      if (record) {
        const data = workoutDetails.map(detail => ({
          ...detail,
          workoutRecordId: record.id
        }))

        const newWorkoutDetails = await WorkoutDetail.bulkCreate(data)

        return newWorkoutDetails
      } else {
        throw new Error('Can not find this record')
      }
    } catch (error) {
      throw new Error(`Failed to create record details. Reason: ${error.message}`)
    }
  },

  editRecordDetails: async (updateWorkoutDetails) => {
    const transaction = await sequelize.transaction()

    try {
      for (const updateDetail of updateWorkoutDetails) {
        const [affectedRows] = await WorkoutDetail.update(updateDetail, {
          where: { id: updateDetail.id },
          transaction
        })

        if (affectedRows === 0) {
          throw new Error(`Can not find this detail with id:${updateDetail.id}`)
        }
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      throw new Error(`Failed to update record details. Reason: ${error.message}`)
    }
  },

  deleteRecordDetails: async (deleteWorkoutDetails) => {
    const transaction = await sequelize.transaction()

    try {
      for (const deleteDetail of deleteWorkoutDetails) {
        const affectedRows = await WorkoutDetail.destroy({
          where: { id: deleteDetail.id },
          transaction
        })

        if (affectedRows === 0) {
          throw new Error(`Can not find this detail with id:${deleteDetail.id}`)
        }
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      throw new Error(`Failed to delete record details. Reason: ${error.message}`)
    }
  }
}

module.exports = workoutRecordServices
