class CustomError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }
}
const controllerErrorHelper = (error, next, summary, type, from) => {
  if (error instanceof CustomError) {
    next(error)
  } else {
    const newError = new CustomError(summary, {
      type,
      from,
      detail: error.message
    })
    next(newError)
  }
}

module.exports = {
  controllerErrorHelper,
  CustomError
}
