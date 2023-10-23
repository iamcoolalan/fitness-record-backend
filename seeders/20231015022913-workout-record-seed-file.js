'use strict'

/** @type {import('sequelize-cli').Migration} */
const WORKOUT_FREQUENCY_PER_WEEK = 7

function randomWorkoutTime (max, min, increment) {
  const MIN_WORKOUT_MINUTES = min
  const MAX_WORKOUT_MINUTES = max
  const MINUTES_INCREMENT = increment
  const NUMBER_OF_BLOCKS = ((MAX_WORKOUT_MINUTES - MIN_WORKOUT_MINUTES) / MINUTES_INCREMENT) + 1

  return MIN_WORKOUT_MINUTES + Math.floor(Math.random() * NUMBER_OF_BLOCKS) * MINUTES_INCREMENT
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const allRecords = []
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    for (const user of users) {
      for (let i = 0; i < WORKOUT_FREQUENCY_PER_WEEK; i++) {
        // 假設每人每天運動的次數是0~2次
        const randomWorkoutTimesPerDay = Math.floor(Math.random() * 3)

        if (randomWorkoutTimesPerDay === 0) {
          continue
        }

        // 產生一個禮拜的紀錄
        const newDate = new Date()
        const recordDay = new Date(newDate.setDate(newDate.getDate() - i))

        const recordsOfTheDay = Array.from({ length: randomWorkoutTimesPerDay }, () => {
          return {
            user_id: user.id,
            workout_time: randomWorkoutTime(120, 30, 15),
            date: recordDay,
            created_at: recordDay,
            updated_at: recordDay
          }
        })

        allRecords.push(...recordsOfTheDay)
      }
    }

    try {
      await queryInterface.bulkInsert('Workout_Records', allRecords)
    } catch (error) {
      console.log('[Insert Workout Records seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Workout_Records', null, {})
    } catch (error) {
      console.log('[Delete Workout Records seed data failed] :', error)
    }
  }
}
