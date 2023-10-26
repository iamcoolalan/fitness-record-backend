const express = require('express')
const router = express.Router()

const bodydataRecordController = require('../../controllers/bodydata-record-controller')

const { createAndEditBodydataRecordValidation } = require('../../middlewares/validation')

router.get('/:bodydataRecordId', bodydataRecordController.getRecord)
router.get('/', bodydataRecordController.getRecords)

router.post('/', createAndEditBodydataRecordValidation, bodydataRecordController.postRecord)

router.patch('/:bodydataRecordId', createAndEditBodydataRecordValidation, bodydataRecordController.patchRecord)

router.delete('/:bodydataRecordId', bodydataRecordController.deleteRecord)

module.exports = router
