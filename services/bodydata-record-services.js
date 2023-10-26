const { Op } = require('sequelize')
const { BodydataRecord } = require('../models')

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
      throw new Error(`Can not find any record. Reason: ${error.message}`)
    }
  },

  getRecordById: async (recordId) => {
    try {
      const record = await BodydataRecord.findByPk(recordId, { raw: true })

      return record
    } catch (error) {
      throw new Error(`Can not find record with id : ${recordId}. Reason: ${error.message}`)
    }
  },

  deleteRecord: async (recordId) => {
    try {
      await BodydataRecord.destroy({ where: { id: recordId } })

      return 'Record deleted successfully.'
    } catch (error) {
      throw new Error(`Can not delete record with id : ${recordId}. Reason: ${error.message}`)
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
      throw new Error(`Can not create record. Reason: ${error.message}`)
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

      return updateData
    } catch (error) {
      throw new Error(`Can not edit record. Reason: ${error.message}`)
    }
  }
}

module.exports = bodydataRecordServices
