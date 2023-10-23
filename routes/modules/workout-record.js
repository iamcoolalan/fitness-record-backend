const express = require('express')
const router = express.Router()

const workoutRecordController = require('../../controllers/workout-record-controller')

const { createRecordValidation, editRecordValidation } = require('../../middlewares/validation')

router.get('/:workoutRecordId', workoutRecordController.getRecord)
router.get('/', workoutRecordController.getRecords)

router.post('/:workoutRecordId/details', workoutRecordController.postRecordDetail)
router.post('/', createRecordValidation, workoutRecordController.postRecord)

router.patch('/details', workoutRecordController.patchRecordDetail)
router.patch('/:workoutRecordId', editRecordValidation, workoutRecordController.patchRecord)

router.delete('/details', workoutRecordController.deleteRecordDetail)
router.delete('/:workoutRecordId', editRecordValidation, workoutRecordController.deleteRecord)

module.exports = router
