if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' })
}

const path = require('path')

const express = require('express')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes/index.js')

const app = express()
const port = process.env.PORT || 3000

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
