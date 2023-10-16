'use strict'

/** @type {import('sequelize-cli').Migration} */
const initialWorkoutCategory = require('./seed-data/workout-category')

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Workout_Categories', initialWorkoutCategory)
    } catch (error) {
      console.log('[Insert Workout Categories seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Workout_Categories', null, {})
    } catch (error) {
      console.log('[Delete Workout Categories seed data failed] :', error)
    }
  }
}
