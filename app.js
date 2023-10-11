import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import express from 'express'
import dotenv from 'dotenv'
import methodOverride from 'method-override'
import session from 'express-session'

import routes from './routes/index.js'

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' })
}

const app = express()
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
