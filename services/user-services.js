const bcrypt = require('bcryptjs')

const { User } = require('../models')

const { CustomError } = require('../helpers/error-handler-helpers')

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
      throw new CustomError('Failed to find user', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: doesUserExist',
        detail: error.message
      })
    }
  },

  createUser: async (userData) => {
    const salt = 10

    try {
      const { passwordCheck, ...data } = {
        ...userData,
        password: await bcrypt.hash(userData.password, salt)
      }

      const newUser = await User.create(data)

      return newUser
    } catch (error) {
      throw new CustomError('Failed to create user', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: createUser',
        detail: error.message
      })
    }
  },

  getUserInfo: async (userId) => {
    try {
      const userInfo = await User.findByPk(userId, {
        attributes: [
          'id',
          'name',
          'email',
          'birthday',
          'gender',
          'activityFactor'
        ],
        raw: true
      })

      return userInfo
    } catch (error) {
      throw new CustomError('Can not show this user info', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: getUserInfo',
        detail: error.message
      })
    }
  },

  editUserInfo: async (userId, updateInfo) => {
    try {
      const user = await User.findByPk(userId, { attributes: ['id', 'email'] })

      if (!user) {
        throw new Error(`Can not find this user with id: ${userId}`)
      }

      if (user.email === 'user1@example.com') {
        if ((updateInfo.email !== user.email) || updateInfo.password) {
          throw new Error('Can not change test account email or password!')
        }
      }

      if (updateInfo.email && updateInfo.email !== user.email) {
        const checkUserExist = await userServices.doesUserExist(updateInfo.email)

        if (checkUserExist) {
          throw new Error('This email already exist!')
        }
      }

      const salt = await bcrypt.genSalt(10)
      const { passwordCheck, ...data } = updateInfo.password
        ? { ...updateInfo, password: await bcrypt.hash(updateInfo.password, salt) }
        : { ...updateInfo }

      const updatedUser = await user.update(data)
      const returnData = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        birthday: updatedUser.birthday,
        gender: updatedUser.gender,
        activityFactor: updatedUser.activityFactor
      }

      return returnData
    } catch (error) {
      throw new CustomError('Can not edit this user info', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: editUserInfo',
        detail: error.message
      })
    }
  },

  getUserTarget: async (userId) => {
    try {
      const userTarget = await User.findByPk(userId, {
        attributes: [
          'id',
          'targetHeight',
          'targetWeight',
          'targetSkeletalMuscle',
          'targetBodyFat',
          'targetVisceralFatLevel'
        ],
        raw: true
      })

      return userTarget
    } catch (error) {
      throw new CustomError('Can not show this user target', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: getUserTarget',
        detail: error.message
      })
    }
  },

  editUserTarget: async (userId, updateTarget) => {
    try {
      const user = await User.findByPk(userId, {
        attributes: [
          'id',
          'targetHeight',
          'targetWeight',
          'targetSkeletalMuscle',
          'targetBodyFat',
          'targetVisceralFatLevel'
        ]
      })

      if (!user) {
        throw new Error(`Can not find this user with id: ${userId}`)
      }

      const updatedUser = await user.update(updateTarget)

      return updatedUser
    } catch (error) {
      throw new CustomError('Can not edit this user target', {
        statusCode: 500,
        type: 'DB Error',
        from: 'User Services: editUserTarget',
        detail: error.message
      })
    }
  }
}

module.exports = userServices
