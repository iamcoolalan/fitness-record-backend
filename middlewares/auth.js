const passport = require('../config/passport')

const loginAuth = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'email 或 密碼 錯誤!'
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
      return res.status(401).json({
        status: 'error',
        message: 'Permission denied'
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
