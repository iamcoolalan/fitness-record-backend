'use strict'

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')

const BCRYPT_SALT_ROUNDS = 10
const USER_AMOUNT = 6
const ACTIVITY_FACTOR = ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active']

function getRandomInt (min, max) {
  const extraAdd = max - min + 1

  return Math.floor(min + Math.random() * extraAdd)
}

function getRandomSkeletalMuscle (isMale, weight) {
  const randomPercentage = isMale === 'male' ? getRandomInt(40, 55) / 100 : getRandomInt(30, 45) / 100

  return Math.round((weight * randomPercentage * 100)) / 100
}

function getRandomBodyFat (isMale) {
  return isMale === 'male' ? getRandomInt(11, 20) / 100 : getRandomInt(16, 25) / 100
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS)

    try {
      await queryInterface.bulkInsert('Users',
        Array.from({ length: USER_AMOUNT }, (_, index) => {
          const randomGender = index % 2 === 0 ? 'male' : 'female'
          const randomHeight = randomGender === 'male' ? getRandomInt(165, 200) : getRandomInt(155, 180)
          const randomBMI = getRandomInt(19, 24)
          const randomWeight = Math.round(randomBMI * Math.pow(randomHeight / 100, 2) * 100) / 100 // 用BMI推算體重
          const randomSkeletalMuscle = getRandomSkeletalMuscle(randomGender, randomWeight)
          const randomBodyFat = getRandomBodyFat(randomGender)
          const randomVisceralFatLevel = getRandomInt(1, 10)

          return {
            name: `user${index + 1}`,
            email: `user${index + 1}@example.com`,
            password: bcrypt.hashSync('123456789', salt),
            birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
            gender: randomGender,
            activity_factor: ACTIVITY_FACTOR[getRandomInt(0, ACTIVITY_FACTOR.length - 1)],
            target_height: randomHeight,
            target_weight: randomWeight,
            target_skeletal_muscle: randomSkeletalMuscle,
            target_body_fat: randomBodyFat,
            target_visceral_fat_level: randomVisceralFatLevel,
            created_at: new Date(),
            updated_at: new Date()
          }
        })
      )
    } catch (error) {
      console.log('[Insert Users seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Users', null, {})
    } catch (error) {
      console.log('[Delete Users seed data failed] :', error)
    }
  }
}
