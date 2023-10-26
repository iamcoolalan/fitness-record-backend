const bodydataRecordServices = require('../services/bodydata-record-services')

const bodaydataRecordController = {
  getRecords: async (req, res, next) => {
    const userId = req.user.id
    const endDate = req.query.endDate
    const startDate = req.query.startDate ? req.query.startDate : undefined

    try {
      const records = await bodydataRecordServices.getRecordsByRange(userId, endDate, startDate)

      return res.json({
        status: 'success',
        data: records
      })
    } catch (error) {
      next(error)
    }
  },

  getRecord: async (req, res, next) => {
    const bodydataRecordId = req.params.bodydataRecordId

    try {
      const record = await bodydataRecordServices.getRecordById(bodydataRecordId)

      return res.json({
        status: 'success',
        data: record
      })
    } catch (error) {
      next(error)
    }
  },

  postRecord: async (req, res, next) => {
    const userId = req.user.id
    const date = req.query.date
    const newData = req.body

    try {
      const newRecord = await bodydataRecordServices.createNewRecord(userId, date, newData)

      return res.json({
        status: 'success',
        data: newRecord
      })
    } catch (error) {
      next(error)
    }
  },

  patchRecord: async (req, res, next) => {
    const bodydataRecordId = req.params.bodydataRecordId
    const updateData = req.body

    try {
      const updateResult = await bodydataRecordServices.editRecord(bodydataRecordId, updateData)

      return res.json({
        status: 'success',
        data: updateResult
      })
    } catch (error) {
      next(error)
    }
  },

  deleteRecord: async (req, res, next) => {
    const bodydataRecordId = req.params.bodydataRecordId

    try {
      const deleteRecord = await bodydataRecordServices.deleteRecord(bodydataRecordId)

      return res.json({
        status: 'success',
        message: deleteRecord
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = bodaydataRecordController
