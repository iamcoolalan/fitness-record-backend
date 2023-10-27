const { Op } = require('sequelize')
const { BodydataRecord } = require('../models')

const { CustomError } = require('../middlewares/error-handler')

const bodydataRecordServices = {
  getRecordsByRange: async (userId, endDate, startDate = endDate) => {
    try {
      const startDateToQuery = new Date(startDate)
      const endDateToQuery = new Date(endDate)

      const records = await BodydataRecord.findAll({
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
      throw new CustomError('Can not find any record', {
        type: 'DB Error',
        from: 'Bodydata Record Services: getRecordsByRange',
        detail: error.message
      })
    }
  },

  getRecordById: async (recordId) => {
    try {
      const record = await BodydataRecord.findByPk(recordId, { raw: true })

      return record
    } catch (error) {
      throw new CustomError(`Can not find record with id : ${recordId}`, {
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
      console.log(error.message)
      throw new CustomError(`Can not delete record with id : ${recordId}`, {
        type: 'DB Error',
        from: 'Bodydata Record Services: deleteRecord',
        detail: error.message
      })
    }
  },

  createNewRecord: async (userId, date, newData) => {
    const dataToAdd = {
      userId,
      date,
      ...newData
    }

    try {
      const newRecord = await BodydataRecord.create(dataToAdd)

      return newRecord
    } catch (error) {
      throw new CustomError('Can not create record', {
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

      const updatedRecord = await record.update(updateData)

      return updatedRecord
    } catch (error) {
      throw new CustomError('Can not edit record', {
        type: 'DB Error',
        from: 'Bodydata Record Services: editRecord',
        detail: error.message
      })
    }
  }
}

module.exports = bodydataRecordServices
