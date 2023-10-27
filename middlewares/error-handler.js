const { CustomError } = require('../helpers/error-handler-helpers')

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    const { statusCode, type, from, detail } = err.data
    const errorInfo = {
      status: 'error',
      type,
      from,
      summary: err.message,
      detail
    }

    console.log(errorInfo)

    return res.status(statusCode).json(errorInfo)
  } else if (err instanceof Error) {
    const errorInfo = {
      status: 'error',
      type: 'System Error',
      detail: 'Server Internal Error'
    }

    console.log(err.message)

    return res.status(500).json(errorInfo)
  } else {
    const errorInfo = {
      status: 'error',
      type: 'Unknown Error',
      detail: 'An unexpected error occurred.'
    }

    console.log(err)

    return res.status(500).json(errorInfo)
  }
}

module.exports = {
  errorHandler
}
