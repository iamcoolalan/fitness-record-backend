const trainingType = [
  { name: '胸部' },
  { name: '背部' },
  { name: '腿部' },
  { name: '臀部' },
  { name: '手臂' },
  { name: '肩膀' },
  { name: '腹部' },
  { name: '有氧運動' },
  { name: '多功能運動' },
  { name: '其他' }
]

const initialTrainingType = trainingType.map(category => ({
  ...category,
  created_at: new Date(),
  updated_at: new Date()
}))

module.exports = initialTrainingType
