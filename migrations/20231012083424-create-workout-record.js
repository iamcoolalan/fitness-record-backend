'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Workout_Records', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      name: {
        defaultValue: 'New Record',
        type: Sequelize.STRING
      },
      is_done: {
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      workout_time: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      training_volume: {
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('Workout_Records')
  }
}
