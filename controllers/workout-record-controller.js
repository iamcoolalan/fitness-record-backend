const workoutRecordServices = require('../services/workout-record-services')

const { controllerErrorHelper } = require('../helpers/error-handler-helpers')

const workoutRecordController = {
  getRecords: async (req, res, next) => {
    const userId = req.user.id
    const endDate = req.query.endDate
    const startDate = req.query.startDate ? req.query.startDate : undefined

    try {
      const records = await workoutRecordServices.getRecordsByRange(userId, endDate, startDate)

      return res.json({
        status: 'success',
        data: records
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not get records',
        'Internal Server Error',
        'Workout Record Controller: getRecords'
      )
    }
  },

  getRecord: async (req, res, next) => {
    const workoutRecordId = Number(req.params.workoutRecordId)

    try {
      const record = await workoutRecordServices.getRecordDetail(workoutRecordId)

      return res.json({
        status: 'success',
        data: record
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not get record',
        'Internal Server Error',
        'Workout Record Controller: getRecord'
      )
    }
  },

  postRecord: async (req, res, next) => {
    const { name } = req.body
    const date = req.query.date
    const userId = req.user.id

    try {
      const newRecord = await workoutRecordServices.createNewRecord(userId, date, name)

      return res.json({
        status: 'success',
        data: newRecord
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not post record',
        'Internal Server Error',
        'Workout Record Controller: postRecord'
      )
    }
  },

  patchRecord: async (req, res, next) => {
    const workoutRecordId = Number(req.params.workoutRecordId)
    const data = req.body

    try {
      const updatedRecord = await workoutRecordServices.editRecord(workoutRecordId, data)

      return res.json({
        status: 'success',
        data: updatedRecord
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not patch record',
        'Internal Server Error',
        'Workout Record Controller: patchRecord'
      )
    }
  },

  deleteRecord: async (req, res, next) => {
    const workoutRecordId = Number(req.params.workoutRecordId)

    try {
      const deletedRecord = await workoutRecordServices.deleteRecord(workoutRecordId)

      return res.json({
        status: 'success',
        data: deletedRecord
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not delete record',
        'Internal Server Error',
        'Workout Record Controller: deleteRecord'
      )
    }
  },

  postRecordDetail: async (req, res, next) => {
    const workoutRecordId = Number(req.params.workoutRecordId)
    const workoutDetailItems = req.body

    try {
      const newWorkoutDetails = await workoutRecordServices.createRecordDetail(workoutRecordId, workoutDetailItems)

      return res.json({
        status: 'success',
        data: newWorkoutDetails
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not post record detail',
        'Internal Server Error',
        'Workout Record Controller: postRecordDetail'
      )
    }
  },

  patchRecordDetail: async (req, res, next) => {
    const updateWorkoutDetails = req.body

    try {
      await workoutRecordServices.editRecordDetails(updateWorkoutDetails)

      return res.json({
        status: 'success',
        message: 'Update complete'
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not patch record detail',
        'Internal Server Error',
        'Workout Record Controller: patchRecordDetail'
      )
    }
  },

  deleteRecordDetail: async (req, res, next) => {
    const deleteWorkoutDetails = req.body

    try {
      await workoutRecordServices.deleteRecordDetails(deleteWorkoutDetails)

      return res.json({
        status: 'success',
        message: 'Delete complete'
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not delete record detail',
        'Internal Server Error',
        'Workout Record Controller: deleteRecordDetail'
      )
    }
  }
}

module.exports = workoutRecordController
