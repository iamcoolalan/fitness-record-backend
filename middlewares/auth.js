const passport = require('../config/passport')

const { CustomError } = require('../helpers/error-handler-helpers')

const loginAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      throw new CustomError('email 或 密碼 錯誤!', {
        type: 'Authentication Error',
        from: 'Login Auth',
        detail: info
      })
    }

    req.user = user
    next()
  })(req, res, next)
}

const permissionAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      throw new CustomError('Permission denied', {
        type: 'Authentication Error',
        from: 'Permission Auth',
        detail: info
      })
    }

    req.user = user
    next()
  })(req, res, next)
}

module.exports = {
  loginAuth,
  permissionAuth
}
