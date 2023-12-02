const express = require('express')
const router = express.Router()

const userController = require('../../../controllers/user-controller')

const { infoValidation, targetValidation } = require('../../../middlewares/validation')

router.get('/info', userController.getUserInfo)
router.get('/target', userController.getUserTarget)

router.patch('/info', infoValidation, userController.patchUserInfo)
router.patch('/target', targetValidation, userController.patchUserTarget)

module.exports = router
