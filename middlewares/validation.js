function isInputEmpty (input) {
  return input.trim().length === 0
}

function isInvalidLength (input, maxLength) {
  return input.length > maxLength
}

const loginValidation = (req, res, next) => {
  const { email, password } = req.body

  if (isInputEmpty(email)) {
    return res.json({
      status: 'errors',
      message: '請輸入email'
    })
  }

  if (isInputEmpty(password)) {
    return res.json({
      status: 'errors',
      message: '請輸入密碼'
    })
  }

  next()
}

const signupValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 50

  const {
    name,
    email,
    password,
    passwordCheck
  } = req.body

  const errors = []
  const emailRegex = /^\w+((-|\.)\w+)*@[A-Za-z0-9]+((-|\.)[A-Za-z0-9]+)*\.[A-Za-z]+$/

  if (isInputEmpty(name)) {
    errors.push({
      message: '名稱不得空白'
    })
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errors.push({
      message: `暱稱不得超過${MAX_NAME_LENGTH}字`
    })
  }

  if (isInputEmpty(email)) {
    errors.push({
      message: 'Email不得空白'
    })
  } else if (!emailRegex.test(email)) {
    errors.push({
      message: 'Email格式不正確'
    })
  }

  if (isInputEmpty(password)) {
    errors.push({
      message: '密碼不得空白'
    })
  }

  if (isInputEmpty(passwordCheck)) {
    errors.push({
      message: '請再次瑱入密碼'
    })
  } else if (password !== passwordCheck) {
    errors.push({
      message: '密碼與確認密碼不相符'
    })
  }

  if (errors.length > 0) {
    return res.json({
      status: 'error',
      message: errors
    })
  }

  next()
}

const createRecordValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 30

  const { name } = req.body
  let errorMessage

  if (isInputEmpty(name)) {
    errorMessage = '名稱不得空白'
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errorMessage = `名稱不得超過${MAX_NAME_LENGTH}字`
  }

  if (errorMessage) {
    return res.json({
      status: 'error',
      message: errorMessage
    })
  }

  next()
}

const editRecordValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 30

  const { name, date } = req.body
  const errors = []

  if (isInputEmpty(name)) {
    errors.push({ message: '名稱不得空白' })
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errors.push({ message: `名稱不得超過${MAX_NAME_LENGTH}字` })
  }

  if (isInputEmpty(date)) {
    errors.push({ message: '日期不得空白' })
  }

  if (errors.length > 0) {
    return res.json({
      status: 'error',
      message: errors
    })
  }

  next()
}

module.exports = {
  loginValidation,
  signupValidation,
  createRecordValidation,
  editRecordValidation
}
