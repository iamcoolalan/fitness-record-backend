const food = [
  {
    name: '米飯',
    type: '主食',
    protein: 10,
    fat: 1,
    carbohydrates: 140,
    default_serving_size: 500,
    calories: 650
  },
  {
    name: '麵',
    type: '主食',
    protein: 40,
    fat: 5,
    carbohydrates: 150,
    default_serving_size: 500,
    calories: 850
  },
  {
    name: '糙米飯',
    type: '主食',
    protein: 12,
    fat: 5,
    carbohydrates: 140,
    default_serving_size: 500,
    calories: 740
  },
  {
    name: '地瓜',
    type: '主食',
    protein: 5,
    fat: 0,
    carbohydrates: 125,
    default_serving_size: 500,
    calories: 550
  },
  {
    name: '稀飯',
    type: '主食',
    protein: 10,
    fat: 2,
    carbohydrates: 130,
    default_serving_size: 500,
    calories: 600
  },
  {
    name: '燕麥',
    type: '主食',
    protein: 30,
    fat: 15,
    carbohydrates: 165,
    default_serving_size: 500,
    calories: 1080
  },
  {
    name: '蘋果',
    type: '水果',
    protein: 1.5,
    fat: 2,
    carbohydrates: 60,
    default_serving_size: 500,
    calories: 265
  },
  {
    name: '番茄',
    type: '水果',
    protein: 5,
    fat: 1,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 110
  },
  {
    name: '西瓜',
    type: '水果',
    protein: 4,
    fat: 1.5,
    carbohydrates: 75,
    default_serving_size: 500,
    calories: 150
  },
  {
    name: '香蕉',
    type: '水果',
    protein: 6.5,
    fat: 1,
    carbohydrates: 134,
    default_serving_size: 500,
    calories: 450
  },
  {
    name: '芭樂',
    type: '水果',
    protein: 5,
    fat: 1,
    carbohydrates: 50,
    default_serving_size: 500,
    calories: 240
  },
  {
    name: '奇異果',
    type: '水果',
    protein: 7.5,
    fat: 2.5,
    carbohydrates: 72.5,
    default_serving_size: 500,
    calories: 327.5
  },
  {
    name: '高麗菜',
    type: '蔬菜',
    protein: 6,
    fat: 1,
    carbohydrates: 26,
    default_serving_size: 500,
    calories: 125
  },
  {
    name: '花椰菜',
    type: '蔬菜',
    protein: 12,
    fat: 1,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 125
  },
  {
    name: '空心菜',
    type: '蔬菜',
    protein: 10,
    fat: 1,
    carbohydrates: 15,
    default_serving_size: 500,
    calories: 100
  },
  {
    name: '小白菜',
    type: '蔬菜',
    protein: 8,
    fat: 1,
    carbohydrates: 14,
    default_serving_size: 500,
    calories: 95
  },
  {
    name: '美生菜',
    type: '蔬菜',
    protein: 3,
    fat: 0.5,
    carbohydrates: 4.5,
    default_serving_size: 500,
    calories: 45
  },
  {
    name: '荷蘭豆',
    type: '蔬菜',
    protein: 12,
    fat: 1,
    carbohydrates: 32,
    default_serving_size: 500,
    calories: 180
  },
  {
    name: '水蓮',
    type: '蔬菜',
    protein: 4,
    fat: 0.5,
    carbohydrates: 14,
    default_serving_size: 500,
    calories: 80
  },
  {
    name: '水煮蛋',
    type: '蛋豆魚肉類',
    protein: 50,
    fat: 35,
    carbohydrates: 3.5,
    default_serving_size: 500,
    calories: 645
  },
  {
    name: '滷蛋',
    type: '蛋豆魚肉類',
    protein: 50,
    fat: 35,
    carbohydrates: 3.5,
    default_serving_size: 500,
    calories: 645
  },
  {
    name: '蛋黃',
    type: '蛋豆魚肉類',
    protein: 16,
    fat: 27,
    carbohydrates: 8,
    default_serving_size: 500,
    calories: 360
  },
  {
    name: '荷包蛋',
    type: '蛋豆魚肉類',
    protein: 50,
    fat: 35,
    carbohydrates: 3.5,
    default_serving_size: 500,
    calories: 645
  },
  {
    name: '蒸蛋',
    type: '蛋豆魚肉類',
    protein: 50,
    fat: 35,
    carbohydrates: 3.5,
    default_serving_size: 500,
    calories: 645
  },
  {
    name: '黃豆',
    type: '蛋豆魚肉類',
    protein: 40,
    fat: 20,
    carbohydrates: 50,
    default_serving_size: 500,
    calories: 520
  },
  {
    name: '鱈魚',
    type: '蛋豆魚肉類',
    protein: 105,
    fat: 5,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 515
  },
  {
    name: '吳郭魚',
    type: '蛋豆魚肉類',
    protein: 115,
    fat: 6,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 500
  },
  {
    name: '鱸魚',
    type: '蛋豆魚肉類',
    protein: 110,
    fat: 10,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 570
  },
  {
    name: '鮭魚',
    type: '蛋豆魚肉類',
    protein: 100,
    fat: 30,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 730
  },
  {
    name: '鯛魚片',
    type: '蛋豆魚肉類',
    protein: 100,
    fat: 8,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 480
  },
  {
    name: '梅花豬',
    type: '蛋豆魚肉類',
    protein: 70,
    fat: 50,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 750
  },
  {
    name: '松阪豬',
    type: '蛋豆魚肉類',
    protein: 65,
    fat: 60,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 810
  },
  {
    name: '豬里肌',
    type: '蛋豆魚肉類',
    protein: 109,
    fat: 15,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 635
  },
  {
    name: '豬肉片',
    type: '蛋豆魚肉類',
    protein: 101,
    fat: 30,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 770
  },
  {
    name: '牛五花',
    type: '蛋豆魚肉類',
    protein: 65,
    fat: 55,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 795
  },
  {
    name: '牛小排',
    type: '蛋豆魚肉類',
    protein: 70,
    fat: 40,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 670
  },
  {
    name: '牛肉片',
    type: '蛋豆魚肉類',
    protein: 113,
    fat: 25,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 725
  },
  {
    name: '牛腱',
    type: '蛋豆魚肉類',
    protein: 112,
    fat: 20,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 700
  },
  {
    name: '雞胸肉',
    type: '蛋豆魚肉類',
    protein: 110,
    fat: 5,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 535
  },
  {
    name: '雞腿',
    type: '蛋豆魚肉類',
    protein: 90,
    fat: 25,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 645
  },
  {
    name: '洋芋片',
    type: '零食和甜點',
    protein: 7,
    fat: 35,
    carbohydrates: 53,
    default_serving_size: 500,
    calories: 2550
  },
  {
    name: '乳酪蛋糕',
    type: '零食和甜點',
    protein: 45,
    fat: 105,
    carbohydrates: 315,
    default_serving_size: 500,
    calories: 2255
  },
  {
    name: '起司蛋糕',
    type: '零食和甜點',
    protein: 50,
    fat: 80,
    carbohydrates: 300,
    default_serving_size: 500,
    calories: 2000
  },
  {
    name: '豆花',
    type: '零食和甜點',
    protein: 16,
    fat: 9,
    carbohydrates: 23,
    default_serving_size: 500,
    calories: 250
  },
  {
    name: '健達出奇蛋',
    type: '零食和甜點',
    protein: 10,
    fat: 25,
    carbohydrates: 60,
    default_serving_size: 500,
    calories: 575
  },
  {
    name: '曼陀朱',
    type: '零食和甜點',
    protein: 10,
    fat: 22,
    carbohydrates: 64,
    default_serving_size: 500,
    calories: 560
  },
  {
    name: '巧克力蛋糕',
    type: '零食和甜點',
    protein: 45,
    fat: 85,
    carbohydrates: 295,
    default_serving_size: 500,
    calories: 2225
  },
  {
    name: '布丁',
    type: '零食和甜點',
    protein: 17,
    fat: 25,
    carbohydrates: 73,
    default_serving_size: 500,
    calories: 625
  },
  {
    name: '奶茶',
    type: '飲料',
    protein: 4,
    fat: 16,
    carbohydrates: 90,
    default_serving_size: 500,
    calories: 536
  },
  {
    name: '紅茶',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 0
  },
  {
    name: '綠茶',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 0
  },
  {
    name: '可爾必思',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 105,
    default_serving_size: 500,
    calories: 420
  },
  {
    name: '可樂',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 53,
    default_serving_size: 500,
    calories: 212
  },
  {
    name: '雪碧',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 65,
    default_serving_size: 500,
    calories: 260
  },
  {
    name: '黑松沙士',
    type: '飲料',
    protein: 0,
    fat: 0,
    carbohydrates: 53,
    default_serving_size: 500,
    calories: 212
  },
  {
    name: '柳橙汁',
    type: '飲料',
    protein: 3,
    fat: 1,
    carbohydrates: 52,
    default_serving_size: 500,
    calories: 225
  },
  {
    name: '番茄汁',
    type: '飲料',
    protein: 4,
    fat: 1,
    carbohydrates: 22,
    default_serving_size: 500,
    calories: 105
  },
  {
    name: '葡萄汁',
    type: '飲料',
    protein: 2,
    fat: 1,
    carbohydrates: 92,
    default_serving_size: 500,
    calories: 372
  },
  {
    name: '啤酒',
    type: '飲料',
    protein: 5,
    fat: 0,
    carbohydrates: 18,
    default_serving_size: 500,
    calories: 215
  },
  {
    name: '紅酒',
    type: '飲料',
    protein: 1,
    fat: 0,
    carbohydrates: 4,
    default_serving_size: 500,
    calories: 400
  },
  {
    name: '水',
    type: '水',
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 0
  },
  {
    name: '高蛋白',
    type: '補給品',
    protein: 400,
    fat: 5,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 2000
  },
  {
    name: '肌酸',
    type: '補給品',
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 0
  },
  {
    name: 'BCAA',
    type: '補給品',
    protein: 400,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 1600
  },
  {
    name: 'EAA',
    type: '補給品',
    protein: 400,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 1600
  },
  {
    name: '沙拉油',
    type: '油脂和調味料',
    protein: 0,
    fat: 500,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 4500
  },
  {
    name: '橄欖油',
    type: '油脂和調味料',
    protein: 0,
    fat: 500,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 4500
  },
  {
    name: '鹽',
    type: '油脂和調味料',
    protein: 0,
    fat: 0,
    carbohydrates: 0,
    default_serving_size: 500,
    calories: 0
  },
  {
    name: '糖',
    type: '油脂和調味料',
    protein: 0,
    fat: 0,
    carbohydrates: 500,
    default_serving_size: 500,
    calories: 2000
  },
  {
    name: '全脂牛奶',
    type: '乳製品',
    protein: 15,
    fat: 25,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 375
  },
  {
    name: '低脂牛奶',
    type: '乳製品',
    protein: 17,
    fat: 5,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 215
  },
  {
    name: '起司',
    type: '乳製品',
    protein: 125,
    fat: 200,
    carbohydrates: 10,
    default_serving_size: 500,
    calories: 2150
  },
  {
    name: '羊乳',
    type: '乳製品',
    protein: 14,
    fat: 35,
    carbohydrates: 25,
    default_serving_size: 500,
    calories: 465
  },
  {
    name: '保久乳',
    type: '乳製品',
    protein: 16,
    fat: 15,
    carbohydrates: 23,
    default_serving_size: 500,
    calories: 285
  },
  {
    name: '優酪乳',
    type: '乳製品',
    protein: 25,
    fat: 10,
    carbohydrates: 40,
    default_serving_size: 500,
    calories: 350
  }
]

const initialFood = food.map(food => ({
  ...food,
  created_at: new Date(),
  updated_at: new Date()
}))

module.exports = initialFood
