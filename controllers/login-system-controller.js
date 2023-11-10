const jwt = require('jsonwebtoken')

const userServices = require('../services/user-services')

const { controllerErrorHelper, CustomError } = require('../helpers/error-handler-helpers')

const loginSystemController = {
  login: (req, res, next) => {
    try {
      const user = { id: req.user.id }

      const key = process.env.JWT_SECRET
      const token = jwt.sign(user, key, { expiresIn: '30d' })

      return res.json({
        status: 'success',
        token
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Login failed',
        'Internal Server Error',
        'Login System Controller: login'
      )
    }
  },

  signup: async (req, res, next) => {
    const userData = req.body
    const { email } = req.body

    try {
      const doesUserExist = await userServices.doesUserExist(email)

      if (doesUserExist) {
        throw new CustomError(
          '此Email已註冊',
          {
            statusCode: 500,
            type: 'Duplicate email Error',
            from: 'Login System Controller: signup',
            detail: '此Email已註冊,請使用其他email進行註冊'
          }
        )
      }

      const user = await userServices.createUser(userData)
      delete user.password

      return res.json({
        status: 'success',
        data: user
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        500,
        'Signup failed',
        'Internal Server Error',
        'Login System Controller: signup'
      )
    }
  },

  checkToken: (req, res) => {
    res.json({
      status: 'success',
      message: 'valid token'
    })
  }
}

module.exports = loginSystemController
