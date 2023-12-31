'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.ENUM('male', 'female')
      },
      activity_factor: {
        type: Sequelize.ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active')
      },
      target_height: {
        type: Sequelize.FLOAT
      },
      target_weight: {
        type: Sequelize.FLOAT
      },
      target_skeletal_muscle: {
        type: Sequelize.FLOAT
      },
      target_body_fat: {
        type: Sequelize.FLOAT
      },
      target_visceral_fat_level: {
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
    await queryInterface.dropTable('Users')
  }
}
