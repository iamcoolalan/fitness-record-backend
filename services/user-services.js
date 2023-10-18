const bcrypt = require('bcryptjs')

const { User } = require('../models')

const userServices = {
  doesUserExist: async (email) => {
    try {
      const user = await User.findOne({
        where: { email },
        attributes: ['id'],
        raw: true
      })

      return user !== null
    } catch (error) {
      throw new Error('Failed to find user.')
    }
  },

  createUser: async (userData) => {
    const salt = 10

    try {
      const data = {
        ...userData,
        password: await bcrypt.hash(userData.password, salt)
      }

      delete data.passwordCheck

      const newUser = await User.create(data)

      return newUser
    } catch (error) {
      throw new Error('Failed to create user.')
    }
  }
}

module.exports = userServices
