const userServices = require('../services/user-services')

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
      next(error)
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
      next(error)
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
      next(error)
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
      next(error)
    }
  }
}

module.exports = userController
