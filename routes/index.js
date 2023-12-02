const express = require('express')
const marked = require('marked')

const fs = require('fs')

const { errorHandler } = require('../middlewares/error-handler')
const { CustomError } = require('../helpers/error-handler-helpers')

const api = require('./api')

const router = express.Router()

router.use('/api', api)

router.get('/', (req, res, next) => {
  fs.readFile('README.md', 'utf8', (err, data) => {
    if (err) {
      next(err)
    }

    res.send(marked.parse(data))
  })
})

router.use((req, res, next) => {
  const newError = new CustomError('Sorry, we can not find that! More information https://documenter.getpostman.com/view/29142842/2s9YeHbrPd', {
    statusCode: 404,
    type: 'Not Found Error',
    from: 'Server',
    detail: '404 Not Found'
  })

  next(newError)
})

router.use('/', errorHandler)

module.exports = router
