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
        allowNull: false,
        type: Sequelize.DATE
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('male', 'female')
      },
      activity_factor: {
        allowNull: false,
        type: Sequelize.ENUM('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active')
      },
      height: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      weight: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      skeletal_muscle: {
        type: Sequelize.FLOAT
      },
      body_fat: {
        type: Sequelize.FLOAT
      },
      visceral_fat_level: {
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
