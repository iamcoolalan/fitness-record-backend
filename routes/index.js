const express = require('express')

const loginSystemController = require('../controllers/login-system-controller')

const { loginAuth, permissionAuth } = require('../middlewares/auth')
const { loginValidation, targetValidation, infoValidation } = require('../middlewares/validation')
const { errorHandler } = require('../middlewares/error-handler')
const { CustomError } = require('../helpers/error-handler-helpers')

const bodydataRecord = require('./modules/bodydata-record')
const workoutRecord = require('./modules/workout-record')
const user = require('./modules/user')

const router = express.Router()

router.use('/bodydata-record', permissionAuth, bodydataRecord)
router.use('/workout-record', permissionAuth, workoutRecord)
router.use('/user', permissionAuth, user)

router.post('/login', loginValidation, loginAuth, loginSystemController.login)
router.post('/signup', infoValidation, targetValidation, loginSystemController.signup)

router.use((req, res, next) => {
  const newError = new CustomError('Sorry, we cannot find that!', {
    type: 'Not Found Error',
    from: 'Server',
    detail: '404 Not Found'
  })

  next(newError)
})

router.use('/', errorHandler)

module.exports = router
