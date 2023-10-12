'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      food_category_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      protein: {
        type: Sequelize.FLOAT
      },
      fat: {
        type: Sequelize.FLOAT
      },
      carbohydrates: {
        type: Sequelize.FLOAT
      },
      calories: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Food')
  }
}
