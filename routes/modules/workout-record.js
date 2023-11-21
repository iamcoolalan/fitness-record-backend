const express = require('express')
const router = express.Router()

const workoutRecordController = require('../../controllers/workout-record-controller')

const { createWorkoutRecordValidation, editWorkoutRecordValidation } = require('../../middlewares/validation')

router.get('/category', workoutRecordController.getRecordCategories)
router.get('/:workoutRecordId', workoutRecordController.getRecord)
router.get('/', workoutRecordController.getRecords)

router.post('/:workoutRecordId/details', workoutRecordController.postRecordDetail)
router.post('/', createWorkoutRecordValidation, workoutRecordController.postRecord)

router.patch('/details', workoutRecordController.patchRecordDetail)
router.patch('/:workoutRecordId', editWorkoutRecordValidation, workoutRecordController.patchRecord)

router.delete('/details', workoutRecordController.deleteRecordDetail)
router.delete('/:workoutRecordId', workoutRecordController.deleteRecord)

module.exports = router
