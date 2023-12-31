'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Meal_Details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      meal_record_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      food_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      serving_size: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      number_of_servings: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Meal_Details')
  }
}
