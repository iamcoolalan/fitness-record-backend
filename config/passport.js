const passport = require('passport')
const passportJWT = require('passport-jwt')
const passportLocal = require('passport-local')
const bcrypt = require('bcryptjs')

const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy

const { User } = require('../models')

const ExtractJWT = passportJWT.ExtractJwt
const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

const localStrategy = new LocalStrategy({
  usernameField: 'email'
},
async (email, password, done) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'password'],
      raw: true,
      nest: true
    })

    if (!user) {
      return done(null, false)
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return done(null, false)
    }

    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
})

const jwtStrategy = new JWTStrategy(jwtOptions,
  async (jwtPayload, done) => {
    try {
      const user = await User.findByPk(jwtPayload.id, {
        raw: true,
        nest: true
      })

      return done(null, user)
    } catch (error) {
      return done(error, false)
    }
  })

passport.use(localStrategy)
passport.use(jwtStrategy)

module.exports = passport
