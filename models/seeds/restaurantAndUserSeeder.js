if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Restaurant = require('../restaurant') // 載入restaurant model
const User = require('../user') // 載入user model
const restaurantList = require('../../restaurant.json').results // 載入restaurant.json當種子資料

// 連線成功
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2] //第123間餐廳
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5] //第456間餐廳
  }
]

db.once('open', () => {
  Promise.all(SEED_USER.map(async (user) => {
    const { name, email, password, restaurantIndex } = user
    await bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(async (user) => {
        const userId = user._id
        const restaurants = restaurantIndex.map(index => {
          const restaurant = ({ ...restaurantList[index], userId })
          return restaurant
        })
        await Restaurant.create(restaurants)
      })
  }))
    .then(() => {
      console.log('create seeds done.')
      process.exit()
    })
})
