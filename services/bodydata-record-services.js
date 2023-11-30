const { Op } = require('sequelize')
const { BodydataRecord } = require('../models')

const { CustomError } = require('../helpers/error-handler-helpers')

const bodydataRecordServices = {
  getRecordsByRange: async (userId, limit, offset, endDate, startDate = endDate) => {
    try {
      const startDateToQuery = new Date(startDate)
      const endDateToQuery = new Date(endDate)

      const queryOptions = {
        where: {
          userId,
          date: {
            [Op.gte]: startDateToQuery,
            [Op.lte]: endDateToQuery
          }
        },
        attributes: [
          'id',
          'height',
          'weight',
          'skeletalMuscle',
          'bodyFat',
          'visceralFatLevel',
          'date'
        ],
        order: [['date', 'DESC']],
        raw: true
      }

      if (limit > 0) {
        queryOptions.limit = limit
      }

      if (offset) {
        queryOptions.offset = offset
      }

      const records = await BodydataRecord.findAndCountAll(queryOptions)

      return records
    } catch (error) {
      throw new CustomError('Can not find any record', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Bodydata Record Services: getRecordsByRange',
        detail: error.message
      })
    }
  },

  getRecordById: async (recordId) => {
    try {
      const record = await BodydataRecord.findByPk(recordId, {
        attributes: [
          'height',
          'weight',
          'skeletalMuscle',
          'bodyFat',
          'visceralFatLevel',
          'date'
        ],
        raw: true
      })

      if (!record) {
        throw new Error(`Can not find this record with id: ${recordId}`)
      }

      return record
    } catch (error) {
      throw new CustomError(`Can not find record with id : ${recordId}`, {
        statusCode: 500,
        type: 'DB Error',
        from: 'Bodydata Record Services: getRecordById',
        detail: error.message
      })
    }
  },

  deleteRecord: async (recordId) => {
    try {
      const record = await BodydataRecord.findByPk(recordId)

      if (!record) {
        throw new Error(`Can not find this record with id: ${recordId}`)
      }

      await record.destroy()

      return 'Record deleted successfully.'
    } catch (error) {
      throw new CustomError(`Can not delete record with id : ${recordId}`, {
        statusCode: 500,
        type: 'DB Error',
        from: 'Bodydata Record Services: deleteRecord',
        detail: error.message
      })
    }
  },

  createNewRecord: async (userId, date, bodydata) => {
    const dataToAdd = {
      userId,
      date,
      ...bodydata
    }

    try {
      const newRecord = await BodydataRecord.create(dataToAdd)

      return newRecord
    } catch (error) {
      throw new CustomError('Can not create record', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Bodydata Record Services: createNewRecord',
        detail: error.message
      })
    }
  },

  editRecord: async (recordId, updateData) => {
    try {
      const record = await BodydataRecord.findByPk(recordId, {
        attributes: ['id']
      })

      if (!record) {
        throw new Error(`can not find this record with id: ${recordId}`)
      }

      const dataToUpdate = {
        date: updateData.date,
        ...updateData.bodydata
      }
      const updatedRecord = await record.update(dataToUpdate)

      return updatedRecord
    } catch (error) {
      throw new CustomError('Can not edit record', {
        statusCode: 500,
        type: 'DB Error',
        from: 'Bodydata Record Services: editRecord',
        detail: error.message
      })
    }
  }
}

module.exports = bodydataRecordServices
