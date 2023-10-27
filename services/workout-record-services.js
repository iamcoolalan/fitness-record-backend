const { Op } = require('sequelize')
const { sequelize, WorkoutRecord, WorkoutDetail } = require('../models')
const { CustomError } = require('../middlewares/error-handler')

const workoutRecordServices = {
  getRecordsByRange: async (userId, endDate, startDate = endDate) => {
    try {
      const endDateToQuery = new Date(endDate)
      const startDateToQuery = new Date(startDate)

      const records = await WorkoutRecord.findAndCountAll({
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
      throw new CustomError('Failed to find records', {
        type: 'DB Error',
        from: 'Workout Record Services: getRecordsByRange',
        detail: error.message
      })
    }
  },

  getRecordDetail: async (workoutRecordId) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        include: [WorkoutDetail]
      })

      return record
    } catch (error) {
      throw new CustomError('Failed to find record', {
        type: 'DB Error',
        from: 'Workout Record Services: getRecordDetail',
        detail: error.message
      })
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
      throw new CustomError('Failed to create record', {
        type: 'DB Error',
        from: 'Workout Record Services: createNewRecord',
        detail: error.message
      })
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
      throw new CustomError('Failed to update record', {
        type: 'DB Error',
        from: 'Workout Record Services: editRecord',
        detail: error.message
      })
    }
  },

  deleteRecord: async (workoutRecordId) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId)

      if (record) {
        const deletedRecord = await record.destroy()

        await WorkoutDetail.destroy({ where: { workoutRecordId } })

        return deletedRecord
      } else {
        throw new Error('Can not find this record')
      }
    } catch (error) {
      throw new CustomError('Failed to delete record', {
        type: 'DB Error',
        from: 'Workout Record Services: deleteRecord',
        detail: error.message
      })
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
      throw new CustomError('Failed to create record details', {
        type: 'DB Error',
        from: 'Workout Record Services: createRecordDetail',
        detail: error.message
      })
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

      throw new CustomError('Failed to update record details', {
        type: 'DB Error',
        from: 'Workout Record Services: editRecordDetails',
        detail: error.message
      })
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

      throw new CustomError('Failed to delete record details', {
        type: 'DB Error',
        from: 'Workout Record Services: deleteRecordDetails',
        detail: error.message
      })
    }
  }
}

module.exports = workoutRecordServices
