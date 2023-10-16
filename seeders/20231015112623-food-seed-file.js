'use strict'

/** @type {import('sequelize-cli').Migration} */
const initialFood = require('./seed-data/food')

module.exports = {
  async up (queryInterface, Sequelize) {
    const foodCategories = await queryInterface.sequelize.query(
      'SELECT id, name FROM Food_Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    // 增加對應的分類id到食物的種子資料
    const categoryIdByName = Object.fromEntries(foodCategories.map(category => [category.name, category.id]))

    initialFood.forEach(food => {
      if (categoryIdByName[food.type]) {
        food.food_category_id = categoryIdByName[food.type]
        delete food.type
      }
    })

    try {
      await queryInterface.bulkInsert('Food', initialFood)
    } catch (error) {
      console.log('[Insert Food seed data failed] :', error)
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Food', null, {})
    } catch (error) {
      console.log('[Delete Food seed data failed] :', error)
    }
  }
}
