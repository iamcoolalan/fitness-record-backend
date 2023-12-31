const { CustomError } = require('../helpers/error-handler-helpers')

function isInputEmpty (input) {
  return input === null || input?.trim().length === 0
}

function isInvalidLength (input, maxLength) {
  return input.length > maxLength
}

function checkIfFieldsAreNumbers (fields, inputValue) {
  const errors = []

  fields.forEach(field => {
    if (inputValue[field.name] && typeof inputValue[field.name] !== 'number') {
      errors.push(`${field.label}欄位只能輸入數字`)
    }
  })

  return errors
}

const loginValidation = (req, res, next) => {
  const { email, password } = req.body
  const errors = []

  if (isInputEmpty(email)) {
    errors.push('請輸入email')
  }

  if (isInputEmpty(password)) {
    errors.push('請輸入密碼')
  }

  if (errors.length > 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Login Validation',
      detail: errors.join(', ')
    })
  }

  next()
}

const infoValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 50

  const {
    name,
    email,
    password,
    passwordCheck,
    isRegister
  } = req.body

  const errors = []
  const emailRegex = /^\w+((-|\.)\w+)*@[A-Za-z0-9]+((-|\.)[A-Za-z0-9]+)*\.[A-Za-z]+$/

  if (isInputEmpty(name)) {
    errors.push('名稱不得空白')
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errors.push(`暱稱不得超過${MAX_NAME_LENGTH}字`)
  }

  if (isInputEmpty(email)) {
    errors.push('Email不得空白')
  } else if (!emailRegex.test(email)) {
    errors.push('Email格式不正確')
  }

  if (isRegister) {
    if (isInputEmpty(password)) {
      errors.push('密碼不得空白')
    }

    if (isInputEmpty(passwordCheck)) {
      errors.push('請再次瑱入密碼')
    }
  }

  if (password !== passwordCheck) {
    errors.push('密碼與確認密碼不相符')
  }

  if (errors.length > 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Info Validation',
      detail: errors.join(', ')
    })
  }

  next()
}

const targetValidation = (req, res, next) => {
  const fields = [
    { name: 'targetHeight', label: '目標身高' },
    { name: 'targetWeight', label: '目標體重' },
    { name: 'targetSkeletalMuscle', label: '目標肌肉量' },
    { name: 'targetBodyFat', label: '目標體脂率' },
    { name: 'targetVisceralFatLevel', label: '目標內臟脂肪等級' }
  ]
  const inputValue = req.body

  const errors = checkIfFieldsAreNumbers(fields, inputValue)

  if (errors.length > 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Target Validation',
      detail: errors.join(', ')
    })
  }

  next()
}

const createWorkoutRecordValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 30

  const { name } = req.body
  let errorMessage

  if (isInputEmpty(name)) {
    errorMessage = '名稱不得空白'
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errorMessage = `名稱不得超過${MAX_NAME_LENGTH}字`
  }

  if (errorMessage) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Create Workout Record Validation',
      detail: errorMessage
    })
  }

  next()
}

const editWorkoutRecordValidation = (req, res, next) => {
  const MAX_NAME_LENGTH = 30

  const { name, date } = req.body
  const errors = []

  if (isInputEmpty(name)) {
    errors.push('名稱不得空白')
  } else if (isInvalidLength(name, MAX_NAME_LENGTH)) {
    errors.push(`名稱不得超過${MAX_NAME_LENGTH}字`)
  }

  if (isInputEmpty(date)) {
    errors.push('日期不得空白')
  }

  if (errors.length > 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Edit Workout Record Validation',
      detail: errors.join(', ')
    })
  }

  next()
}

const createAndEditBodydataRecordValidation = (req, res, next) => {
  const fields = [
    { name: 'height', label: '身高' },
    { name: 'weight', label: '體重' },
    { name: 'skeletalMuscle', label: '肌肉量' },
    { name: 'bodyFat', label: '體脂率' },
    { name: 'visceralFatLevel', label: '內臟脂肪等級' }
  ]
  const inputValue = req.body

  if (Object.keys(inputValue.bodydata).length === 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Bodydata Record Validation',
      detail: '請至少填寫一項數據'
    })
  }

  const errors = checkIfFieldsAreNumbers(fields, inputValue)

  if (errors.length > 0) {
    throw new CustomError('輸入欄位錯誤', {
      statusCode: 400,
      type: 'Validate Error',
      from: 'Bodydata Record Validation',
      detail: errors.join(', ')

    })
  }

  next()
}

module.exports = {
  loginValidation,
  infoValidation,
  targetValidation,
  createWorkoutRecordValidation,
  editWorkoutRecordValidation,
  createAndEditBodydataRecordValidation
}
