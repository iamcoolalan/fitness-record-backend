'use strict'

/** @type {import('sequelize-cli').Migration} */
const initialFoodCategory = require('./seed-data/food-category')

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Food_Categories', initialFoodCategory)
    } catch (error) {
      console.log('[Insert Food Categories seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Food_Categories', null, {})
    } catch (error) {
      console.log('[Delete Food Categories seed data failed] :', error)
    }
  }
}
