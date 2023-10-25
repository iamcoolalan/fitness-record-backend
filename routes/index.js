const express = require('express')

const loginSystemController = require('../controllers/login-system-controller')

const { loginAuth, permissionAuth } = require('../middlewares/auth')
const { loginValidation, targetValidation, infoValidation } = require('../middlewares/validation')

const workoutRecord = require('./modules/workout-record')
const user = require('./modules/user')

const router = express.Router()

router.use('/workout-record', permissionAuth, workoutRecord)
router.use('/user', permissionAuth, user)

router.post('/login', loginValidation, loginAuth, loginSystemController.login)
router.post('/signup', infoValidation, targetValidation, loginSystemController.signup)

router.get('*', permissionAuth, (req, res) => {
  res.send('hi')
})

module.exports = router
