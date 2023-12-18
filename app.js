if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' })
}

const path = require('path')

const express = require('express')
const session = require('express-session')
const cors = require('cors')

const routes = require('./routes/index.js')
const passport = require('./config/passport.js')

const app = express()
const port = process.env.PORT || 3000

const corsOptions = {
  origin: 'https://iamcoolalan.github.io',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.json())
app.use(routes)

app.listen(port, () => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`App is running on https://www.fitness-record.com:${port}`)
  } else {
    console.log(`App is running on http://localhost:${port}`)
  }
})
