const bodydataRecordServices = require('../services/bodydata-record-services')

const { controllerErrorHelper } = require('../helpers/error-handler-helpers')
const { getOffset } = require('../helpers/pagination-helper')

const bodydataRecordController = {
  getRecords: async (req, res, next) => {
    const DEFAULT_LIMIT = 5

    const userId = req.user.id
    const endDate = req.query.endDate
    const startDate = req.query.startDate ? req.query.startDate : undefined
    const page = Number(req.query.page)
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    try {
      const records = await bodydataRecordServices.getRecordsByRange(userId, limit, offset, endDate, startDate)

      return res.json({
        status: 'success',
        data: records
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Can not get records',
        'Internal Server Error',
        'Bodydata Record Controller: getRecords'
      )
    }
  },

  getRecord: async (req, res, next) => {
    const bodydataRecordId = Number(req.params.bodydataRecordId)

    try {
      const record = await bodydataRecordServices.getRecordById(bodydataRecordId)

      return res.json({
        status: 'success',
        data: record
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Can not get record',
        'Internal Server Error',
        'Bodydata Record Controller: getRecord'
      )
    }
  },

  postRecord: async (req, res, next) => {
    const userId = req.user.id
    const { date, bodydata } = req.body

    try {
      const newRecord = await bodydataRecordServices.createNewRecord(userId, date, bodydata)

      return res.json({
        status: 'success',
        data: newRecord
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Can not post record',
        'Internal Server Error',
        'Bodydata Record Controller: postRecord'
      )
    }
  },

  patchRecord: async (req, res, next) => {
    const bodydataRecordId = Number(req.params.bodydataRecordId)
    const updateData = req.body

    try {
      const updateResult = await bodydataRecordServices.editRecord(bodydataRecordId, updateData)

      return res.json({
        status: 'success',
        data: updateResult
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Can not patch record',
        'Internal Server Error',
        'Bodydata Record Controller: patchRecord'
      )
    }
  },

  deleteRecord: async (req, res, next) => {
    const bodydataRecordId = Number(req.params.bodydataRecordId)

    try {
      const deleteRecord = await bodydataRecordServices.deleteRecord(bodydataRecordId)

      return res.json({
        status: 'success',
        message: deleteRecord
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Can not delete record',
        'Internal Server Error',
        'Bodydata Record Controller: deleteRecord'
      )
    }
  }
}

module.exports = bodydataRecordController
