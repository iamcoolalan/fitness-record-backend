const workoutRecordServices = require('../services/workout-record-services')

const workoutRecordController = {
  getRecords: async (req, res, next) => {
    const year = Number(req.query.year)
    const month = Number(req.query.month)
    const day = req.query.day ? Number(req.query.day) : null
    const userId = req.user.id

    try {
      const records = await workoutRecordServices.getRecordsByDateOrMonth(userId, year, month, day)

      return res.json({
        status: 'success',
        data: records
      })
    } catch (error) {
      next(error)
    }
  },

  getRecord: async (req, res, next) => {
    const workoutRecordId = req.params.workoutRecordId

    try {
      const record = await workoutRecordServices.getRecordDetail(workoutRecordId)

      return res.json({
        status: 'success',
        data: record
      })
    } catch (error) {
      next(error)
    }
  },

  postRecord: async (req, res, next) => {
    const { name } = req.body
    const date = req.query.date
    const userId = req.user.id

    try {
      const newRecord = await workoutRecordServices.createNewRecord(userId, date, name)

      res.json({
        status: 'success',
        data: newRecord
      })
    } catch (error) {
      next(error)
    }
  },

  patchRecord: async (req, res, next) => {
    const workoutRecordId = req.params.workoutRecordId
    const data = req.body

    try {
      const updatedRecord = await workoutRecordServices.editRecord(workoutRecordId, data)

      res.json({
        status: 'success',
        data: updatedRecord
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  },

  deleteRecord: async (req, res, next) => {
    const workoutRecordId = req.params.workoutRecordId

    try {
      const deletedRecord = await workoutRecordServices.deleteRecord(workoutRecordId)

      return res.json({
        status: 'success',
        data: deletedRecord
      })
    } catch (error) {
      next(error)
    }
  },

  postRecordDetail: async (req, res, next) => {
    const workoutRecordId = req.params.workoutRecordId
    const workoutDetailItems = req.body

    try {
      const newWorkoutDetails = await workoutRecordServices.createRecordDetail(workoutRecordId, workoutDetailItems)

      res.json({
        status: 'success',
        data: newWorkoutDetails
      })
    } catch (error) {
      next(error)
    }
  },

  patchRecordDetail: async (req, res, next) => {
    const updateWorkoutDetails = req.body

    try {
      await workoutRecordServices.editRecordDetails(updateWorkoutDetails)

      res.json({
        status: 'success',
        message: 'Update complete'
      })
    } catch (error) {
      next(error)
    }
  },

  deleteRecordDetail: async (req, res, next) => {
    const deleteWorkoutDetails = req.body

    try {
      await workoutRecordServices.deleteRecordDetails(deleteWorkoutDetails)

      res.json({
        status: 'success',
        message: 'Delete complete'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = workoutRecordController
