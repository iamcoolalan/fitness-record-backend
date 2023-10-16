'use strict'

/** @type {import('sequelize-cli').Migration} */
const NUMBER_OF_FOOD_ITEMS_PRE_MEAL = 4

function pickRandomOne (array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomInt (min, max, increment) {
  const NUMBER_OF_BLOCKS = (max - min) / increment + 1

  return min + Math.floor(Math.random() * NUMBER_OF_BLOCKS) * increment
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const mealRecords = await queryInterface.sequelize.query(
      'SELECT id, type, created_at FROM Meal_Records;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const food = await queryInterface.sequelize.query(
      'SELECT Food.id, Food_Categories.name FROM Food LEFT JOIN Food_Categories ON Food.food_category_id = Food_Categories.id;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const allRecords = []
    const water = food.filter(food => food.name === '水')
    const foodCollect = [
      food.filter(food => food.name === '主食'),
      food.filter(food => food.name === '蔬菜'),
      food.filter(food => food.name === '蛋豆魚肉類'),
      food.filter(food => !['蛋豆魚肉類', '蔬菜', '主食', '水'].includes(food.name))
    ]

    for (const record of mealRecords) {
      const isWater = record.type === 'water'

      if (isWater) {
        allRecords.push({
          meal_record_id: record.id,
          food_id: water[0].id,
          serving_size: getRandomInt(1, 2, 1),
          number_of_servings: getRandomInt(250, 500, 10),
          created_at: record.created_at,
          updated_at: record.created_at
        })
      } else {
        const recordOfTheMeal = Array.from({ length: NUMBER_OF_FOOD_ITEMS_PRE_MEAL }, (_, index) => {
          return {
            meal_record_id: record.id,
            food_id: pickRandomOne(foodCollect[index]).id,
            serving_size: 1,
            number_of_servings: getRandomInt(200, 350, 25),
            created_at: record.created_at,
            updated_at: record.created_at
          }
        })

        allRecords.push(...recordOfTheMeal)
      }
    }

    try {
      await queryInterface.bulkInsert('Meal_Details', allRecords)
    } catch (error) {
      console.log('[Insert Meal Details seed data failed] :', error)
    }
  },
  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Meal_Details', null, {})
    } catch (error) {
      console.log('[Delete Meal Details seed data failed] :', error)
    }
  }
}
