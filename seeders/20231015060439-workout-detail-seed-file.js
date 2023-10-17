'use strict'

/** @type {import('sequelize-cli').Migration} */
const DEFAULT_SET = 4
const DEFAULT_REPETITIONS = 10
const DEFAULT_MOVEMENT_PER_DAY = 6

function randomWeight (min, max, increment) {
  const MIN_WORKOUT_WEIGHT = min
  const MAX_WORKOUT_WEIGHT = max
  const WEIGHT_INCREMENT = increment
  const NUMBER_OF_BLOCKS = ((MAX_WORKOUT_WEIGHT - MIN_WORKOUT_WEIGHT) / WEIGHT_INCREMENT) + 1

  return MIN_WORKOUT_WEIGHT + Math.floor(Math.random() * NUMBER_OF_BLOCKS) * WEIGHT_INCREMENT
}

// 不要選到重覆的動作
function getRandomCategoryAndRemoveIt (array) {
  if (array.length === 0) {
    throw new Error('Array is empty')
  }

  const randomCategory = array[Math.floor(Math.random() * array.length)]
  const categoryIndex = array.indexOf(randomCategory)

  array.splice(categoryIndex, 1)

  return randomCategory
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const workoutRecords = await queryInterface.sequelize.query(
      'SELECT id, created_at FROM Workout_Records;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const workoutCategories = await queryInterface.sequelize.query(
      'SELECT id FROM Workout_Categories WHERE is_addable = true;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const allRecords = []

    for (const record of workoutRecords) {
      const copyWorkoutCategories = workoutCategories.slice()

      const recordOfTheWorkout = Array.from({ length: DEFAULT_MOVEMENT_PER_DAY }, () => {
        return {
          workout_record_id: record.id,
          workout_category_id: getRandomCategoryAndRemoveIt(copyWorkoutCategories).id,
          total_sets: DEFAULT_SET,
          repetitions: DEFAULT_REPETITIONS,
          weight: randomWeight(20, 80, 2),
          created_at: record.created_at,
          updated_at: record.created_at
        }
      })

      allRecords.push(...recordOfTheWorkout)
    }

    try {
      await queryInterface.bulkInsert('Workout_Details', allRecords)
    } catch (error) {
      console.log('[Insert Workout Details seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Workout_Details', null, {})
    } catch (error) {
      console.log('[Delete Workout Details seed data failed] :', error)
    }
  }
}
