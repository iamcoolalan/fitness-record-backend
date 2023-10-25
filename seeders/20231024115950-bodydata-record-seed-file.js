'use strict'
const DECIMAL = 2

function getRandomValueByRange (max, min, index) {
  const randomValue = min + Math.random() * (max - min)

  return index % 2 === 0 ? randomValue : -randomValue
}

function fixValue (value, decimals) {
  return Number(value.toFixed(decimals))
}

function getRandomWeight (baseValue, index) {
  const min = 0.1
  const max = 2

  return fixValue(baseValue + getRandomValueByRange(max, min, index), DECIMAL)
}

function getRandomBodyFat (baseValue, index) {
  const min = 0.01
  const max = 0.03

  return fixValue(baseValue + getRandomValueByRange(max, min, index), DECIMAL)
}

function getRandomSkeletalMuscle (baseValue, index) {
  const min = 0.5
  const max = 2

  return fixValue(baseValue + getRandomValueByRange(max, min, index), DECIMAL)
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const NUM_OF_RECORD = 7

    try {
      const users = await queryInterface.sequelize.query(
        'SELECT id, target_height, target_weight, target_body_fat, target_skeletal_muscle, target_visceral_fat_level FROM Users;',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      )

      const allRecords = []

      users.forEach(user => {
        const newRecords = Array.from({ length: NUM_OF_RECORD }, (_, index) => {
          const newDate = new Date()
          const recordDay = new Date(newDate.setDate(newDate.getDate() - index))

          return {
            user_id: user.id,
            height: user.target_height,
            weight: getRandomWeight(user.target_weight, index),
            body_fat: getRandomBodyFat(user.target_body_fat, index),
            skeletal_muscle: getRandomSkeletalMuscle(user.target_skeletal_muscle, index),
            visceral_fat_level: user.target_visceral_fat_level,
            date: recordDay,
            created_at: recordDay,
            updated_at: recordDay
          }
        })

        allRecords.push(...newRecords)
      })

      await queryInterface.bulkInsert('Bodydata_Records', allRecords)
    } catch (error) {
      console.log('[Insert Bodydata Records seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Bodydata_Records', null, {})
    } catch (error) {
      console.log('[Delete Bodydata Records seed data failed] :', error)
    }
  }
}
