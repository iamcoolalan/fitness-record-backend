const jwt = require('jsonwebtoken')

const userServices = require('../services/user-services')

const loginSystemController = {
  login: (req, res, next) => {
    try {
      const user = req.user
      delete user.password

      const key = process.env.JWT_SECRET
      const token = jwt.sign(user, key, { expiresIn: '30d' })

      res.json({
        status: 'success',
        token
      })
    } catch (error) {
      next(error)
    }
  },

  signup: async (req, res, next) => {
    const userData = req.body
    const { email } = req.body

    try {
      const doesUserExist = await userServices.doesUserExist(email)

      if (doesUserExist) {
        return res.json({
          status: 'error',
          message: '此Email已註冊'
        })
      }

      const user = await userServices.createUser(userData)
      delete user.password

      return res.json({
        status: 'success',
        data: user
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = loginSystemController
