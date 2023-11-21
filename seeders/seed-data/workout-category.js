/*
finish part
- 重量訓練 --> 推 --> 胸推 --> 坐姿(機械)

next time add
重量訓練 --> 推 --> 胸推 --> 站姿
*/

const { faker } = require('@faker-js/faker')

const WorkoutCategory = [
  // 重量訓練
  { name: '重量訓練', path: null, is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推
  { name: '推', path: '重量訓練', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推
  { name: '胸推', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械)
  { name: '坐姿(機械)', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '平推(寬握)', path: '重量訓練/推/坐姿(機械)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/平推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/平推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/平推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '平推(窄握)', path: '重量訓練/推/坐姿(機械)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/平推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/平推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/平推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '上斜推(寬握)', path: '重量訓練/推/坐姿(機械)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '上斜推(窄握)', path: '重量訓練/推/坐姿(機械)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 下斜推
  { name: '下斜推', path: '重量訓練/推/坐姿(機械)', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 站姿
  { name: '站姿', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 半蹲
  { name: '半蹲', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 仰臥
  { name: '仰臥', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 地板
  { name: '地板', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 史密斯
  { name: '史密斯', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 肩推
  { name: '肩推', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 雙槓
  { name: '雙槓', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 伏地挺身
  { name: '伏地挺身', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 三頭肌伸屈
  { name: '三頭肌伸屈', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸飛鳥
  { name: '胸飛鳥', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 前平舉
  { name: '前平舉', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 側平舉
  { name: '側平舉', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 拉
  { name: '拉', path: '重量訓練', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 下肢
  { name: '下肢', path: '重量訓練', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 軀幹
  { name: '軀幹', path: '重量訓練', is_addable: false, description: '', image: '' },
  // 多功能訓練
  { name: '多功能訓練', path: null, is_addable: false, description: '', image: '' },
  // 有氧訓練
  { name: '有氧訓練', path: null, is_addable: false, description: '', image: '' }
]

const initialWorkoutCategory = WorkoutCategory.map(category => ({
  ...category,
  description: faker.lorem.paragraphs({ min: 1, max: 3 }),
  image: faker.image.url({ height: 350, width: 350 }),
  created_at: new Date(),
  updated_at: new Date()
}))

module.exports = initialWorkoutCategory
