const foodCategory = [
  { name: '主食' },
  { name: '水果' },
  { name: '蔬菜' },
  { name: '蛋豆魚肉類' },
  { name: '零食和甜點' },
  { name: '飲料' },
  { name: '水' },
  { name: '補給品' },
  { name: '油脂和調味料' },
  { name: '乳製品' }
]

const initialFoodCategory = foodCategory.map(category => ({
  ...category,
  created_at: new Date(),
  updated_at: new Date()
}))

module.exports = initialFoodCategory
