const { Op } = require('sequelize')
const {
  sequelize,
  WorkoutRecord,
  WorkoutDetail,
  WorkoutCategory
} = require('../models')
const { CustomError } = require('../helpers/error-handler-helpers')

const workoutRecordServices = {
  getRecordsByRange: async (
    userId,
    limit,
    offset,
    endDate,
    startDate = endDate
  ) => {
    try {
      const endDateToQuery = new Date(endDate)
      const startDateToQuery = new Date(startDate)

      const queryOptions = {
        where: {
          userId,
          date: {
            [Op.gte]: startDateToQuery,
            [Op.lte]: endDateToQuery
          }
        },
        order: [['date', 'DESC']],
        raw: true
      }

      if (limit > 0) {
        queryOptions.limit = limit
      }

      if (offset) {
        queryOptions.offset = offset
      }

      const totalTrainingVolume = await WorkoutRecord.sum('trainingVolume', {
        where: {
          userId,
          date: {
            [Op.gte]: startDateToQuery,
            [Op.lte]: endDateToQuery
          }
        }
      })

      const records = await WorkoutRecord.findAndCountAll(queryOptions)

      return {
        totalTrainingVolume,
        ...records
      }
    } catch (error) {
      throw new CustomError('Failed to find records', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: getRecordsByRange',
        detail: error.message
      })
    }
  },

  getRecordDetail: async (workoutRecordId) => {
    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        include: [
          {
            model: WorkoutDetail,
            attributes: [
              'id',
              'workoutCategoryId',
              'totalSets',
              'repetitions',
              'weight'
            ],
            include: {
              model: WorkoutCategory,
              attributes: ['name', 'path']
            }
          }
        ]
      })

      if (!record) {
        throw new Error(`Can not find this record with id: ${workoutRecordId}`)
      }

      return record
    } catch (error) {
      throw new CustomError('Failed to find record', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: getRecordDetail',
        detail: error.message
      })
    }
  },

  createNewRecord: async (userId, date, name, workoutTime, trainingVolume) => {
    try {
      const record = await WorkoutRecord.create({
        userId,
        date,
        workoutTime,
        trainingVolume,
        name: name || undefined
      })

      return record
    } catch (error) {
      throw new CustomError('Failed to create record', {
        statusCode: 500,
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
        throw new Error(`Can not find this record with id: ${workoutRecordId}`)
      }
    } catch (error) {
      throw new CustomError('Failed to update record', {
        statusCode: 500,
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
        throw new Error(`Can not find this record with id: ${workoutRecordId}`)
      }
    } catch (error) {
      throw new CustomError('Failed to delete record', {
        statusCode: 500,
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
        const data = workoutDetails.map((detail) => ({
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
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: createRecordDetail',
        detail: error.message
      })
    }
  },

  editRecordDetails: async (updateWorkoutDetails, workoutRecordId) => {
    const transaction = await sequelize.transaction()

    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        attributes: ['id'],
        raw: true
      })

      if (!record) {
        throw new Error(`Can not find this record with id: ${workoutRecordId}`)
      }

      for (const updateDetail of updateWorkoutDetails) {
        await WorkoutDetail.upsert(
          {
            ...updateDetail,
            workoutRecordId
          },
          {
            transaction
          }
        )
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      throw new CustomError('Failed to update record details', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: editRecordDetails',
        detail: error.message
      })
    }
  },

  deleteRecordDetails: async (deleteWorkoutDetails, workoutRecordId) => {
    const transaction = await sequelize.transaction()

    try {
      const record = await WorkoutRecord.findByPk(workoutRecordId, {
        attributes: ['id'],
        raw: true
      })

      if (!record) {
        throw new Error(`Can not find this record with id: ${workoutRecordId}`)
      }

      for (const deleteDetail of deleteWorkoutDetails) {
        const affectedRows = await WorkoutDetail.destroy({
          where: {
            id: deleteDetail.id,
            workoutRecordId
          },
          transaction
        })

        if (affectedRows === 0) {
          throw new Error(
            `Can not find this detail with id:${deleteDetail.id}`
          )
        }
      }

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()

      throw new CustomError('Failed to delete record details', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: deleteRecordDetails',
        detail: error.message
      })
    }
  },

  getRecordCategories: async () => {
    try {
      const categories = await WorkoutCategory.findAll({
        attributes: ['id', 'name', 'isAddable', 'path'],
        raw: true
      })

      return categories
    } catch (error) {
      throw new CustomError('Failed to get record categories', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Workout Record Services: getRecordCategories',
        detail: error.message
      })
    }
  }
}

module.exports = workoutRecordServices
