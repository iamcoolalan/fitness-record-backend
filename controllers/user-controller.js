const userServices = require('../services/user-services')

const { controllerErrorHelper } = require('../helpers/error-handler-helpers')

const userController = {
  getUserInfo: async (req, res, next) => {
    const userId = req.user.id

    try {
      const userInfo = await userServices.getUserInfo(userId)

      return res.json({
        status: 'success',
        data: userInfo
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not get user info',
        'Internal Server Error',
        'User Controller: getUserInfo'
      )
    }
  },

  patchUserInfo: async (req, res, next) => {
    const userId = req.user.id
    const updateData = req.body

    try {
      const updateUserInfo = await userServices.editUserInfo(userId, updateData)

      return res.json({
        status: 'success',
        data: updateUserInfo
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not patch user info',
        'Internal Server Error',
        'User Controller: patchUserInfo'
      )
    }
  },

  getUserTarget: async (req, res, next) => {
    const userId = req.user.id

    try {
      const userTarget = await userServices.getUserTarget(userId)

      return res.json({
        status: 'success',
        data: userTarget
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not get user target',
        'Internal Server Error',
        'User Controller: getUserTarget'
      )
    }
  },

  patchUserTarget: async (req, res, next) => {
    const userId = req.user.id
    const updateData = req.body

    try {
      const updatedTarget = await userServices.editUserTarget(userId, updateData)

      return res.json({
        status: 'success',
        data: updatedTarget
      })
    } catch (error) {
      controllerErrorHelper(
        error,
        next,
        'Can not patch user target',
        'Internal Server Error',
        'User Controller: patchUserTarget'
      )
    }
  }
}

module.exports = userController
