'use strict'

/** @type {import('sequelize-cli').Migration} */
const mealTime = ['breakfast', 'lunch', 'dinner', 'water', 'extra']
const MEAL_RECORDS_DAYS = 7

// 隨機產生每天吃的餐數
function getRandomMealPerDay () {
  const min = 4
  const max = 6

  return Math.floor(min + Math.random() * (max - min + 1))
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const allMealRecord = []

    for (const user of users) {
      for (let i = 0; i < MEAL_RECORDS_DAYS; i++) {
        const randomMealPerDay = getRandomMealPerDay()

        const newDate = new Date()
        const recordDay = new Date(newDate.setDate(newDate.getDate() - i))

        const recordsOfTheDay = Array.from({ length: randomMealPerDay }, (_, index) => {
          if (index < 4) {
            return {
              user_id: user.id,
              type: mealTime[index],
              created_at: recordDay,
              updated_at: recordDay
            }
          } else {
            return {
              user_id: user.id,
              type: mealTime[4],
              created_at: recordDay,
              updated_at: recordDay
            }
          }
        })

        allMealRecord.push(...recordsOfTheDay)
      }
    }

    try {
      await queryInterface.bulkInsert('Meal_Records', allMealRecord)
    } catch (error) {
      console.log('[Insert Meal Records seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Meal_Records', null, {})
    } catch (error) {
      console.log('[Delete Meal Records seed data failed] :', error)
    }
  }
}
