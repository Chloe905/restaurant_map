const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入restaurant model
const restaurantList = require('../../restaurant.json').results // 載入restaurant.json當種子資料

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
// 連線失敗
db.on('error', () => {
  console.error('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected on seeder!')

  Restaurant.create(...restaurantList)
    .then(() => {
      console.log('restaurant seeder done')
      db.close()
    })
    .catch(err => console.log(err))
})
