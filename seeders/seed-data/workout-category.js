/*
finish part
- 重量訓練 --> 推 --> 胸推 --> 坐姿(機械)

next time add
重量訓練 --> 推 --> 胸推 --> 站姿
*/

const { faker } = require('@faker-js/faker')

const WorkoutCategory = [
  // 重量訓練
  { name: '重量訓練(Isolation training)', path: null, is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推
  { name: '推(Push)', path: '重量訓練/推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推
  { name: '胸推', path: '重量訓練/推/胸推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械)
  { name: '坐姿(機械)', path: '重量訓練/推/坐姿(機械)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '平推(寬握)', path: '重量訓練/推/坐姿(機械)/平推(寬握)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/平推(寬握)/雙手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/平推(寬握)/單手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(寬握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/平推(寬握)/交替', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '平推(窄握)', path: '重量訓練/推/坐姿(機械)/平推(窄握)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/平推(窄握)/雙手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/平推(窄握)/單手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 平推(窄握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/平推(窄握)/交替', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '上斜推(寬握)', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)/雙手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)/單手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/上斜推(寬握)/交替', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(寬握)
  { name: '上斜推(窄握)', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '雙手', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)/雙手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '單手', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)/單手', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 上斜推(窄握)
  { name: '交替', path: '重量訓練/推/坐姿(機械)/上斜推(窄握)/交替', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 坐姿(機械) --> 下斜推
  { name: '下斜推', path: '重量訓練/推/坐姿(機械)/下斜推', is_addable: true, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 站姿
  { name: '站姿', path: '重量訓練/推/站姿', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 半蹲
  { name: '半蹲', path: '重量訓練/推/半蹲', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 仰臥
  { name: '仰臥', path: '重量訓練/推/仰臥', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 地板
  { name: '地板', path: '重量訓練/推/地板', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸推 --> 史密斯
  { name: '史密斯', path: '重量訓練/推/史密斯', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 肩推
  { name: '肩推', path: '重量訓練/推/肩推', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 雙槓
  { name: '雙槓', path: '重量訓練/推/雙槓', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 伏地挺身
  { name: '伏地挺身', path: '重量訓練/推/伏地挺身', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 三頭肌伸屈
  { name: '三頭肌伸屈', path: '重量訓練/推/三頭肌伸屈', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 胸飛鳥
  { name: '胸飛鳥', path: '重量訓練/推/胸飛鳥', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 前平舉
  { name: '前平舉', path: '重量訓練/推/前平舉', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 推 --> 側平舉
  { name: '側平舉', path: '重量訓練/推/側平舉', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 拉
  { name: '拉(Pull)', path: '重量訓練/拉', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 下肢
  { name: '下肢(Lower limb)', path: '重量訓練/下肢', is_addable: false, description: '', image: '' },
  // 重量訓練 --> 軀幹
  { name: '軀幹(Trunk)', path: '重量訓練/軀幹', is_addable: false, description: '', image: '' },
  // 多功能訓練
  { name: '多功能訓練(Muti-Function training)', path: null, is_addable: false, description: '', image: '' },
  // 有氧訓練
  { name: '有氧訓練(Aerobics)', path: null, is_addable: false, description: '', image: '' }
]

const initialWorkoutCategory = WorkoutCategory.map(category => ({
  ...category,
  description: faker.lorem.paragraphs({ min: 1, max: 3 }),
  image: faker.image.url({ height: 350, width: 350 }),
  created_at: new Date(),
  updated_at: new Date()
}))

module.exports = initialWorkoutCategory
