const express = require('express')

const loginSystemController = require('../controllers/login-system-controller')

const { loginAuth, permissionAuth } = require('../middlewares/auth')
const { loginValidation, signupValidation } = require('../middlewares/validation')

const workoutRecord = require('./modules/workout-record')

const router = express.Router()

router.use('/workout-record', permissionAuth, workoutRecord)

router.post('/login', loginValidation, loginAuth, loginSystemController.login)
router.post('/signup', signupValidation, loginSystemController.signup)

router.get('*', permissionAuth, (req, res) => {
  res.send('hi')
})

module.exports = router
