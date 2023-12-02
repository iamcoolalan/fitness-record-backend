const express = require('express')

const loginSystemController = require('../../controllers/login-system-controller')

const { loginAuth, permissionAuth } = require('../../middlewares/auth')
const { loginValidation, targetValidation, infoValidation } = require('../../middlewares/validation')
const { errorHandler } = require('../../middlewares/error-handler')

const bodydataRecord = require('./modules/bodydata-record')
const workoutRecord = require('./modules/workout-record')
const user = require('./modules/user')

const router = express.Router()

router.use('/bodydata-record', permissionAuth, bodydataRecord)
router.use('/workout-record', permissionAuth, workoutRecord)
router.use('/user', permissionAuth, user)

router.get('/check-token', permissionAuth, loginSystemController.checkToken)

router.post('/login', loginValidation, loginAuth, loginSystemController.login)
router.post('/signup', infoValidation, targetValidation, loginSystemController.signup)

router.use('/', errorHandler)

module.exports = router
